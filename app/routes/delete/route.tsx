import { useQuery } from "@tanstack/react-query"
import { hc } from "hono/client"
import type { Api } from "api/route"
import { NoteHeader } from "../_index/components/note-header"
import { NoteNavigation } from "../_index/components/note-navigation"
import { Separator } from "~/components/ui/separator"
import { NoteCard } from "../_index/components/note-card"

export default function DeletePage() {
  const query = useQuery({
    queryKey: ["posts"],
    async queryFn() {
      const client = hc<Api>("/")
      const result = await client.api.posts.$get({
        query: {
          is_deleted: "true",
        },
      })
      return await result.json()
    },
  })

  const onRefetch = () => {
    query.refetch()
  }

  return (
    <div>
      <NoteHeader />
      <div className="flex">
        <NoteNavigation />
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="w-full">
          <div className="p-4 space-y-4">
            <div className="flex justify-center">
              <p>{"ゴミ箱内のメモは 7 日後に削除されます。"}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {query.data
                ?.filter((post) => post.isDeleted)
                .map((post) => (
                  <NoteCard
                    key={post.uuid}
                    uuid={post.uuid}
                    text={post.text}
                    isBookmarked={post.isBookmarked}
                    isArchived={post.isArchived ?? false}
                    isDeleted={post.isDeleted ?? false}
                    onRefetch={onRefetch}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
