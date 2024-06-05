import { eq, desc } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { bookmarksTable, postsTable } from "~/schema"
import { object, safeParse, string } from "valibot"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

const schema = z.object({
  user_id: z.number(),
})

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
  .post("/:post_id/bookmarks", zValidator("json", schema), async (c) => {
    const database = drizzle(c.env.DB)

    const postId = c.req.param("post_id")
    console.log(postId)

    const json = c.req.valid("json")
    console.log(json)

    const post = await database
      .select()
      .from(postsTable)
      .where(eq(postsTable.uuid, postId))
      .get()

    if (post === undefined) {
      return c.json("Not found", { status: 404 })
    }

    const bookmark = await database
      .select()
      .from(bookmarksTable)
      .where(eq(bookmarksTable.postId, post.id))
      .get()

    if (bookmark !== undefined) {
      await database
        .delete(bookmarksTable)
        .where(eq(bookmarksTable.postId, post.id))
      return c.json({})
    }

    await database.insert(bookmarksTable).values({
      userId: json.user_id,
      postId: post.id,
    })

    return c.json({})
  })
  .put("/:post_id/archive", async (c) => {
    const database = drizzle(c.env.DB)

    const postId = c.req.param("post_id")

    await database
      .update(postsTable)
      .set({ isArchived: true })
      .where(eq(postsTable.uuid, postId))

    return c.json({})
  })
  .get("/", async (c) => {
    const database = drizzle(c.env.DB)

    const relations = await database
      .select()
      .from(postsTable)
      .where(eq(postsTable.isDeleted, false))
      .leftJoin(bookmarksTable, eq(postsTable.id, bookmarksTable.postId))
      .orderBy(desc(postsTable.text))
      .all()
    console.log(relations)

    const posts = relations.map((relation) => {
      return {
        ...relation.posts,
        isBookmarked: relation.bookmarks !== null,
      }
    })

    return c.json(posts)
  })
  .delete("/:post_id", async (c) => {
    const database = drizzle(c.env.DB)

    const postId = c.req.param("post_id")
    console.log(postId)

    await database
      .update(postsTable)
      .set({ isDeleted: true })
      .where(eq(postsTable.uuid, postId))

    return c.json({})
  })
