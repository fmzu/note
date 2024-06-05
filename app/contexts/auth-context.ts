import { createContext } from "react"

export type AuthContextValue =
  | {
      isLoggedIn: true
      userId: string
    }
  | {
      isLoggedIn: false
      userId: null
    }

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  userId: null,
})
