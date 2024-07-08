import { NewNoteForm } from "./new-note-form"
import { NoteCard } from "./note-card"
import { useQuery } from "@tanstack/react-query"
import { client } from "~/lib/client"

export function NoteArticle() {
  const query = useQuery({
    queryKey: ["posts"],
    async queryFn() {
      const result = await client.api.posts.$get({
        query: { is_archived: "false" },
      })
      return await result.json()
    },
  })

  const onRefetch = () => {
    query.refetch()
  }

  return (
    <div className="p-4 space-y-4">
      <NewNoteForm onRefetch={onRefetch} />
      <div className="flex flex-col gap-y-2">
        {query.data?.map((post) => (
          <NoteCard
            key={post.uuid}
            uuid={post.uuid}
            text={post.text}
            isBookmarked={post.isBookmarked}
            isArchived={post.isArchived ?? false}
            isDeleted={post.isDeleted}
            onRefetch={onRefetch}
          />
        ))}
      </div>
    </div>
  )
}
