import { Input } from "~/components/ui/input"

export function NoteHeader() {
  return (
    <div className="h-16 bg-lime-300 flex justify-center items-center">
      <Input placeholder="検索" className="max-w-4xl" />
    </div>
  )
}
