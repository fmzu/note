import type { MetaFunction } from "@remix-run/cloudflare"
import { NoteArticle } from "./components/note-article"
import { NoteHeader } from "./components/note-header"

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
      <NoteArticle />
    </div>
  )
}
