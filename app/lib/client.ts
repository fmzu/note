import type { Api } from "api/route"
import { hc } from "hono/client"

export const client = hc<Api>("/")
