import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts"
import { usersTable } from "~/schema"
import { eq } from "drizzle-orm"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"
import { signAuthToken } from "~/lib/sign-auth-token"
import { appConfig } from "~/lib/app-config"
import { createAuthHeaders } from "~/lib/create-auth-headers"

export const authRoute = new Hono<{ Bindings: { DB: D1Database } }>()
  .post(
    "/sign/up",
    zValidator(
      "json",
      z.object({
        login: z.string(),
        password: z.string(),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const salt = genSaltSync(10)

      const hashedPassword = hashSync(json.password, salt)

      const userUuid = crypto.randomUUID()

      await db.insert(usersTable).values({
        uuid: userUuid,
        name: "guest",
        email: json.login,
        login: json.login,
        hashedPassword: hashedPassword,
        avatarIconURL: null,
      })

      const { accessToken, refreshToken } = await signAuthToken({
        userUuid: userUuid,
        accessTokenExpiresIn: appConfig.accessTokenExpiresIn,
        refreshTokenExpiresIn: appConfig.refreshTokenExpiresIn,
      })

      const headers = await createAuthHeaders({ accessToken, refreshToken })

      return c.json({}, { headers })
    },
  )
  .post(
    "/sign/in",
    zValidator(
      "json",
      z.object({
        login: z.string(),
        password: z.string(),
      }),
    ),
    async (c) => {
      const json = c.req.valid("json")

      const db = drizzle(c.env.DB)

      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.login, json.login))
        .get()

      console.log(user)

      if (user === undefined) {
        return c.json({ message: "ユーザが見つかりません" }, { status: 404 })
      }

      if (user.hashedPassword === null) {
        return c.json({ message: "パスワードが違います" }, { status: 404 })
      }

      const result = compareSync(json.password, user.hashedPassword)

      if (result === false) {
        return c.json({ message: "パスワードが違います" }, { status: 400 })
      }

      const { accessToken, refreshToken } = await signAuthToken({
        userUuid: user.uuid,
        accessTokenExpiresIn: appConfig.accessTokenExpiresIn,
        refreshTokenExpiresIn: appConfig.refreshTokenExpiresIn,
      })

      const headers = await createAuthHeaders({ accessToken, refreshToken })

      return c.json({ message: null }, { headers })
    },
  )
