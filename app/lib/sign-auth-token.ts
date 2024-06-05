import { sign } from "hono/jwt"

type Props = {
  userUuid: string
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: number
}

export async function signAuthToken(props: Props) {
  const accessToken = await sign(
    {
      user_id: props.userUuid,
      // 1時間
      exp: props.accessTokenExpiresIn,
    },
    import.meta.env.VITE_ACCESS_TOKEN_SECRET,
  )

  const refreshToken = await sign(
    {
      user_id: props.userUuid,
      // 14日
      exp: props.refreshTokenExpiresIn,
    },
    import.meta.env.VITE_REFRESH_TOKEN_SECRET,
  )

  return { accessToken, refreshToken }
}
