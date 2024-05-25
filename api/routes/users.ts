import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import {} from "valibot"
import { usersTable } from "~/schema"

export const usersRoute = new Hono<{ Bindings: { DB: D1Database } }>()

usersRoute.post("/", async (c) => {
  return new Response()
})

usersRoute.get("/", async (c) => {
  const db = drizzle(c.env.DB)

  const users = await db.select().from(usersTable)

  const results = users.map((user) => {
    return {
      id: user.id,
    }
  })

  return new Response(JSON.stringify(results), {
    headers: {
      "Content-Type": "application/json",
    },
  })
})

usersRoute.put("/", async (c) => {
  return new Response()
})

usersRoute.delete("/", async (c) => {
  return new Response()
})
