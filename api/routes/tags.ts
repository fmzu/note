import { Hono } from "hono"
import {} from "valibot"

export const tagsRoute = new Hono<{ Bindings: { DB: D1Database } }>()

tagsRoute.post("/", async (c) => {
  return new Response()
})

tagsRoute.get("/", async (c) => {
  return new Response()
})

tagsRoute.put("/", async (c) => {
  return new Response()
})

tagsRoute.delete("/", async (c) => {
  return new Response()
})
