import { createCookie } from "@remix-run/cloudflare"
import { appConfig } from "./app-config"

export const refreshTokenCookie = createCookie("refresh_token", {
  maxAge: appConfig.refreshTokenExpiresIn,
})
