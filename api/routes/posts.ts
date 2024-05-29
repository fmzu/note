import { desc, eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { postsTable } from "~/schema"
import { object, safeParse, string } from "valibot"

export const postsRoute = new Hono<{ Bindings: { DB: D1Database } }>()
  .post("/", async (c) => {
    const db = drizzle(c.env.DB)

    const jsonBody = await c.req.json()

    const vBody = object({
      text: string(),
    })

    const postId = crypto.randomUUID()

    const body = safeParse(vBody, jsonBody)

    if (body.success === false) {
      throw new Response("Bad request", { status: 400 })
    }

    await db.insert(postsTable).values({
      uuid: postId,
      title: "",
      text: body.output.text,
    })

    const newPost = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.uuid, postId))
      .get()

    if (newPost === undefined) {
      throw new Response("Not found", { status: 404 })
    }

    return new Response(JSON.stringify(newPost))
  })
  .get("/", async (c) => {
    const database = drizzle(c.env.DB)

    const allPosts = await database
      .select()
      .from(postsTable)
      .where(eq(postsTable.isDeleted, false))
      .orderBy(desc(postsTable.text))
      .all()

    return c.json(allPosts)
  })
  .delete("/", async (c) => {
    const database = drizzle(c.env.DB)

    const json = await c.req.json()

    await database
      .update(postsTable)
      .set({ isDeleted: true })
      .where(eq(postsTable.uuid, json.uuid))

    return new Response(JSON.stringify({}))
  })
