import type { MetaFunction } from "@remix-run/react"
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

export default function ArchivePage() {
  const query = useQuery({
    queryKey: ["posts", "archived"],
    async queryFn() {
      const client = hc<Api>("/")
      const result = await client.api.posts.$get({
        query: {
          is_archived: "true",
        },
      })
      return await result.json()
    },
  })

  const onRefetch = () => {
    query.refetch()
  }

  return (
    <div className="flex">
      <NoteNavigation />
      <Separator style={{ height: "initial" }} orientation="vertical" />
      <div className="w-full">
        <div className="p-4 space-y-4">
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
      </div>
    </div>
  )
}
