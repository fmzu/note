import { createCookie } from "@remix-run/cloudflare"

const accessTokenExpiresIn = Math.floor(Date.now() / 1000) + 60 * 60

export const accessTokenCookie = createCookie("access_token", {
  maxAge: accessTokenExpiresIn,
})
