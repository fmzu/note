import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import stylesheet from "~/globals.css?url"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { LinksFunction } from "@remix-run/cloudflare"
import { AuthContextProvider } from "./components/auth-context-provider"
import { Toaster } from "./components/ui/sonner"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
]

type Props = { children: React.ReactNode }

export function Layout(props: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthContextProvider>{props.children}</AuthContextProvider>
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  )
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}
