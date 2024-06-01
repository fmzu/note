import {} from "~/components/ui/card"
import { NewNoteForm } from "./new-note-form"
import { NoteCard } from "./note-card"
import { useQuery } from "@tanstack/react-query"
import { hc } from "hono/client"
import type { Api } from "api/route"

export function NoteArticle() {
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
            uuid={post.uuid}
            text={post.text}
            onRefetch={onRefetch}
            isBookmarked={post.isBookmarked}
          />
        ))}
      </div>
    </div>
  )
}
