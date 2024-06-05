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
    <div>
      <NoteHeader />
      {"BookmarkPage"}
      <div className="flex">
        <NoteNavigation />
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="w-full">
          <div className="px-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {query.data?.map(
                (post) =>
                  post.isBookmarked && (
                    <NoteCard
                      key={post.uuid}
                      uuid={post.uuid}
                      text={post.text}
                      onRefetch={onRefetch}
                      isBookmarked={post.isBookmarked}
                      isArchived={post.isArchived ?? false}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
