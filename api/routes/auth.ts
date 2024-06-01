import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts"
import { usersTable } from "~/schema"
import { eq } from "drizzle-orm"
import { sign } from "hono/jwt"
import { createCookie } from "@remix-run/cloudflare"
import { accessTokenCookie } from "~/lib/access-token-cookie"

export const authRoute = new Hono<{ Bindings: { DB: D1Database } }>()

authRoute.post("/sign-up", async (c) => {
  const json = await c.req.json()

  const db = drizzle(c.env.DB)

  const salt = genSaltSync(10)

  const hashedPassword = hashSync(json.password, salt)

  await db.insert(usersTable).values({
    uuid: crypto.randomUUID(),
    name: "guest",
    email: json.login,
    login: json.login,
    hashedPassword: hashedPassword,
    avatarIconURL: json.avatarIconURL,
  })

  console.log(json)

  return new Response()
})

authRoute.post("/sign-in", async (c) => {
  const json = await c.req.json()

  const db = drizzle(c.env.DB)

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.login, json.login))
    .get()

  console.log(user)

  if (user === undefined) {
    return new Response("Not found", { status: 404 })
  }

  if (user.hashedPassword === null) {
    return new Response("Not found", { status: 404 })
  }

  const result = compareSync(json.password, user.hashedPassword)
  console.log(result)

  if (result === false) {
    return new Response("パスワードが違います", { status: 400 })
  }

  const accessTokenExpiresIn = Math.floor(Date.now() / 1000) + 60 * 60

  const accessToken = await sign(
    {
      user_id: user.uuid,
      // 1時間
      exp: accessTokenExpiresIn,
    },
    import.meta.env.VITE_ACCESS_TOKEN_SECRET,
  )

  const refreshTokenExpiresIn =
    Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14

  const refreshToken = await sign(
    {
      user_id: user.uuid,
      // 14日
      exp: refreshTokenExpiresIn,
    },
    import.meta.env.VITE_REFRESH_TOKEN_SECRET,
  )

  const serializedAccessTokenCookie =
    await accessTokenCookie.serialize(accessToken)

  const headers = new Headers()

  headers.append("Set-Cookie", serializedAccessTokenCookie)

  const refreshTokenCookie = createCookie("refresh_token", {
    maxAge: refreshTokenExpiresIn,
  })

  const serializedRefreshTokenCookie =
    await refreshTokenCookie.serialize(refreshToken)

  headers.append("Set-Cookie", serializedRefreshTokenCookie)

  return c.json({}, { headers })
})
