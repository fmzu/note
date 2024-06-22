import {
  type LoaderFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/cloudflare"
import { NoteArticle } from "./components/note-article"
import { NoteHeader } from "./components/note-header"
import { NoteNavigation } from "./components/note-navigation"
import { accessTokenCookie } from "~/lib/access-token-cookie"
import { Separator } from "~/components/ui/separator"
import { useSession } from "@hono/auth-js/react"

export default function Index() {
  const session = useSession()

  // const query = useQuery({
  //   queryKey: ["posts"],
  //   async queryFn() {
  //     const client = hc<Api>("/")
  //     const result = await client.api.posts.$get()
  //     return await result.json()
  //   },
  // })

  // const onRefetch = () => {
  //   query.refetch()
  // }

  return (
    <div>
      <NoteHeader />
      <div className="flex">
        <NoteNavigation />
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="w-full">
          <NoteArticle />
        </div>
      </div>
    </div>
  )
}

export async function loader(args: LoaderFunctionArgs) {
  const cookieHeader = args.request.headers.get("Cookie")

  const accessToken = await accessTokenCookie.parse(cookieHeader)

  // const payload = await verify(
  //   accessToken,
  //   import.meta.env.VITE_ACCESS_TOKEN_SECRET,
  // )

  return json({})
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ]
}
