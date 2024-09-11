import { Hono } from "hono"
import { postsRoute } from "./routes/posts"
import { usersRoute } from "./routes/users"
import { tagsRoute } from "./routes/tags"
import { bookmarksRoute } from "./routes/bookmarks"
import { authHandler, initAuthConfig } from "@hono/auth-js"
import { getAuthConfig } from "./get-auth-config"

export const api = new Hono<{ Bindings: { DB: D1Database } }>()
  .use("*", initAuthConfig(getAuthConfig))
  .use("/api/auth/*", authHandler())
  .route("/api/posts", postsRoute)
  .route("/api/users", usersRoute)
  .route("/api/tags", tagsRoute)
  .route("/api/boards", tagsRoute)
  .route("/api/bookmarks", bookmarksRoute)

export type Api = typeof api
