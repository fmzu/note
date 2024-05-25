import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import {} from "valibot"
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts"
import { usersTable } from "~/schema"
import { eq } from "drizzle-orm"

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

  const salt = genSaltSync(10)

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

  const token = crypto.randomUUID()

  return new Response(JSON.stringify({ token }))
})
