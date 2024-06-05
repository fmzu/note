import type { MetaFunction } from "@remix-run/react"
import { NoteArticle } from "../_index/components/note-article"
import { NoteHeader } from "../_index/components/note-header"
import { NoteNavigation } from "../_index/components/note-navigation"
import { Separator } from "~/components/ui/separator"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ]
}

export default function NotificationPage() {
  return (
    <div>
      <NoteHeader />
      {"NotificationPage"}
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
