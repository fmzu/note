import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const postsTable = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  uuid: text("uuid", { length: 256 }).notNull().unique(),
  title: text("title", { length: 128 }).notNull(),
  text: text("text", { length: 2048 }).notNull(),
  createdAt: text("created_at", { length: 256 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  uuid: text("uuid", { length: 256 }).notNull(),
  name: text("name", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull().unique(),
  login: text("login", { length: 256 }).notNull().unique(),
  hashedPassword: text("hashed_password", { length: 256 }),
  avatarIconURL: text("avatar_icon_url", { length: 256 }),
})
