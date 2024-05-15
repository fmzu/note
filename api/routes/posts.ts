import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { drizzlePosts } from "~/schema"
import { object, safeParse, string } from "valibot"

export const postsRoute = new Hono<{ Bindings: { DB: D1Database } }>()

postsRoute.post("/", async (c) => {
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

  await db.insert(drizzlePosts).values({
    uuid: postId,
    title: "",
    text: body.output.text,
  })

  const newPost = await db
    .select()
    .from(drizzlePosts)
    .where(eq(drizzlePosts.uuid, postId))
    .get()

  if (newPost === undefined) {
    throw new Response("Not found", { status: 404 })
  }

  return new Response(JSON.stringify(newPost))
})

postsRoute.get("/", async (c) => {
  const database = drizzle(c.env.DB)

  const allPosts = await database.select().from(drizzlePosts).all()

  return new Response(JSON.stringify(allPosts))
})
