import type { MetaFunction } from "@remix-run/react"
import { NoteHeader } from "../_index/components/note-header"
import { NoteNavigation } from "../_index/components/note-navigation"
import { Separator } from "~/components/ui/separator"
import { NoteCard } from "../_index/components/note-card"
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

export default function BookmarkPage() {
  const query = useQuery({
    queryKey: ["bookmarks"],
    async queryFn() {
      const client = hc<Api>("/")
      const result = await client.api.bookmarks.$get()
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {query.data
                ?.filter((bookmark) => !bookmark.post.isDeleted)
                .map((bookmark) => (
                  <NoteCard
                    key={bookmark.post.uuid}
                    uuid={bookmark.post.uuid}
                    text={bookmark.post.text}
                    isBookmarked={true}
                    isArchived={bookmark.post.isArchived ?? false}
                    isDeleted={bookmark.post.isDeleted ?? false}
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
