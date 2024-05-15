import type { Config } from "drizzle-kit"

export default {
  dialect: "sqlite",
  schema: "app/schema.ts",
  out: "migrations",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.toml",
    dbName: "note",
  },
} satisfies Config
