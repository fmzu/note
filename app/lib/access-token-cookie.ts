import { createCookie } from "@remix-run/cloudflare"
import { appConfig } from "./app-config"

export const accessTokenCookie = createCookie("access_token", {
  maxAge: appConfig.accessTokenExpiresIn,
})
