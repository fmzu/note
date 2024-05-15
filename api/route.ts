import { Hono } from "hono"
import { postsRoute } from "./routes/posts"
import { usersRoute } from "./routes/users"
import { tagsRoute } from "./routes/tags"

export const api = new Hono<{ Bindings: { DB: D1Database } }>()

api.route("/api/posts", postsRoute)

api.route("/api/users", usersRoute)

api.route("/api/tags", tagsRoute)

api.route("/api/boards", tagsRoute)
