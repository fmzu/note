import type { MetaFunction } from "@remix-run/cloudflare"
import { Button } from "~/components/ui/button"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ]
}

export default function Index() {
  return (
    <div className="p-4">
      <Button>{"Debug"}</Button>
    </div>
  )
}
