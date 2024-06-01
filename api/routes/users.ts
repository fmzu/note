import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { eq } from "drizzle-orm"
import { usersTable } from "~/schema"

export const usersRoute = new Hono<{ Bindings: { DB: D1Database } }>()

  .post("/", async (c) => {
    return new Response()
  })

  .get("/", async (c) => {
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

  .put("/", async (c) => {
    return new Response()
  })

  .delete("/", async (c) => {
    return new Response()
  })

  .get("/:user_id/bookmarks", async (c) => {
    const db = drizzle(c.env.DB)

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, 1))

      .limit(1)

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
