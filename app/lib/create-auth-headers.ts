import { accessTokenCookie } from "./access-token-cookie"
import { refreshTokenCookie } from "./refresh-token-cookie"

type Props = {
  accessToken: string
  refreshToken: string
}

/**
 * ヘッダーを作成する
 * @param props
 * @returns
 */
export async function createAuthHeaders(props: Props) {
  const serializedAccessTokenCookie = await accessTokenCookie.serialize(
    props.accessToken,
  )

  const headers = new Headers()

  headers.append("Set-Cookie", serializedAccessTokenCookie)

  const serializedRefreshTokenCookie = await refreshTokenCookie.serialize(
    props.refreshToken,
  )

  headers.append("Set-Cookie", serializedRefreshTokenCookie)

  return headers
}
