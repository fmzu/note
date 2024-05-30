import type { MetaFunction } from "@remix-run/react"
import { NoteArticle } from "../_index/components/note-article"
import { NoteHeader } from "../_index/components/note-header"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ]
}

export default function ArchievePage() {
  return (
    <div>
      <NoteHeader />
      {"ArchievePage"}
      <NoteArticle />
    </div>
  )
}
