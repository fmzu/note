import { Hono } from "hono"
import { postsRoute } from "./routes/posts"
import { usersRoute } from "./routes/users"
import { tagsRoute } from "./routes/tags"
import { authRoute } from "./routes/auth"
import { bookmarksRoute } from "./routes/bookmarks"

export const api = new Hono<{ Bindings: { DB: D1Database } }>()
  .route("/api/posts", postsRoute)
  .route("/api/users", usersRoute)
  .route("/api/tags", tagsRoute)
  .route("/api/boards", tagsRoute)
  .route("/api/auth", authRoute)
  .route("/api/bookmarks", bookmarksRoute)

export type Api = typeof api
