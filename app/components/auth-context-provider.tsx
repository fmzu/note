import { decode } from "hono/jwt"
import { useEffect, useState } from "react"
import { AuthContext, type AuthContextValue } from "~/contexts/auth-context"
import { accessTokenCookie } from "~/lib/access-token-cookie"

type Props = { children: React.ReactNode }

export function AuthContextProvider(props: Props) {
  const [value, setValue] = useState<AuthContextValue>({
    isLoggedIn: false,
    userId: null,
  })

  useEffect(() => {
    accessTokenCookie.parse(document.cookie).then((value) => {
      if (!value) return
      try {
        const result = decode(value)
        setValue({
          isLoggedIn: true,
          userId: result.payload.user_id as string,
        })
      } catch (error) {
        console.error(error)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}
