import { eq, desc, and } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { bookmarksTable, postsTable, usersTable } from "~/schema"
import { object } from "zod"
import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

export const postsRoute = new Hono<{ Bindings: { DB: D1Database } }>()
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        text: z.string(),
      }),
    ),
    async (c) => {
      const auth = c.get("authUser")
      if (auth?.user === undefined) {
        return c.json({ success: false }, { status: 401 })
      }

      const db = drizzle(c.env.DB)

      const body = c.req.valid("json")

      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.uuid, auth.user?.id))
        .get()

      if (user === undefined) {
        throw new Response("Not found", { status: 404 })
      }

      const postId = crypto.randomUUID()

      await db.insert(postsTable).values({
        uuid: postId,
        title: "",
        text: body.text,
        userId: user.id,
        isArchived: false,
        isDeleted: false,
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
    },
  )
  .post(
    "/:post_id/bookmarks",
    zValidator(
      "json",
      z.object({
        user_id: z.number(),
      }),
    ),
    async (c) => {
      const database = drizzle(c.env.DB)

      const postId = c.req.param("post_id")

      const json = c.req.valid("json")

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
    },
  )
  .put("/:post_id/archive", async (c) => {
    const database = drizzle(c.env.DB)

    const postId = c.req.param("post_id")

    const post = await database
      .select()
      .from(postsTable)
      .where(eq(postsTable.uuid, postId))
      .get()

    if (post === undefined) {
      return c.json("Not found", { status: 404 })
    }

    await database
      .update(postsTable)
      .set({ isArchived: !post.isArchived })
      .where(eq(postsTable.uuid, postId))

    return c.json({})
  })
  .get(
    "/",
    zValidator(
      "query",
      object({
        is_archived: z.string().optional(),
        is_deleted: z.string().optional(),
      }),
    ),
    async (c) => {
      const query = c.req.valid("query")

      const database = drizzle(c.env.DB)

      if (query.is_archived === "true") {
        const relations = await database
          .select()
          .from(postsTable)
          .where(eq(postsTable.isArchived, true))
          .leftJoin(bookmarksTable, eq(postsTable.id, bookmarksTable.postId))
          .orderBy(desc(postsTable.text))
          .all()

        const posts = relations.map((relation) => {
          return {
            ...relation.posts,
            isBookmarked: relation.bookmarks !== null,
          }
        })

        return c.json(posts)
      }

      const relations = await database
        .select()
        .from(postsTable)
        .where(
          and(
            eq(postsTable.isDeleted, false),
            eq(postsTable.isArchived, false),
          ),
        )
        .leftJoin(bookmarksTable, eq(postsTable.id, bookmarksTable.postId))
        .orderBy(desc(postsTable.text))
        .all()

      const posts = relations.map((relation) => {
        return {
          ...relation.posts,
          isBookmarked: relation.bookmarks !== null,
        }
      })

      return c.json(posts)
    },
  )
  .delete("/:post_id", async (c) => {
    const database = drizzle(c.env.DB)

    const postId = c.req.param("post_id")

    await database
      .update(postsTable)
      .set({ isDeleted: true })
      .where(eq(postsTable.uuid, postId))

    return c.json({})
  })
