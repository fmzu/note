import { Hono } from "hono"
import {} from "valibot"

export const boardsRoute = new Hono<{ Bindings: { DB: D1Database } }>()

boardsRoute.post("/", async (c) => {
  return new Response()
})

boardsRoute.get("/", async (c) => {
  return new Response()
})

boardsRoute.put("/", async (c) => {
  return new Response()
})

boardsRoute.delete("/", async (c) => {
  return new Response()
})
