import { eq, desc } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { bookmarksTable, postsTable } from "~/schema"
import {} from "zod"
import { z } from "zod"

const schema = z.object({
  user_id: z.number(),
})

export const bookmarksRoute = new Hono<{ Bindings: { DB: D1Database } }>()
  .get("/", async (c) => {
    const database = drizzle(c.env.DB)

    const relations = await database
      .select()
      .from(bookmarksTable)
      .leftJoin(postsTable, eq(bookmarksTable.postId, postsTable.id))
      .orderBy(desc(postsTable.text))
      .all()

    const bookmarks = relations
      .map((relation) => {
        if (relation.posts === null) {
          return null
        }
        return {
          post: relation.posts,
          ...relation.bookmarks,
        }
      })
      .filter((t) => t !== null)

    return c.json(bookmarks)
  })
  .delete("/:post_id", async (c) => {
    const database = drizzle(c.env.DB)

    const postId = c.req.param("post_id")

    await database
      .update(postsTable)
      .set({ isDeleted: true })
      .where(eq(postsTable.uuid, postId))

    return c.json({})
  })
