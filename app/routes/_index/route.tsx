import type { MetaFunction } from "@remix-run/cloudflare"
import {} from "drizzle-orm"
import { NewNoteForm } from "./components/new-note-form"
import { NoteCard } from "./components/note-card"
import { useQuery } from "@tanstack/react-query"
import { hc } from "hono/client"
import type { Api } from "api/route"

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
  const query = useQuery({
    queryKey: ["posts"],
    async queryFn() {
      const client = hc<Api>("/")
      const result = await client.api.posts.$get()
      return await result.json()
    },
  })

  const onRefetch = () => {
    query.refetch()
  }

  return (
    <div className="p-4 space-y-4">
      <NewNoteForm onRefetch={onRefetch} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {query.data?.map((post) => (
          <NoteCard
            key={post.uuid}
            id={post.uuid}
            text={post.text}
            onRefetch={onRefetch}
          />
        ))}
      </div>
    </div>
  )
}
