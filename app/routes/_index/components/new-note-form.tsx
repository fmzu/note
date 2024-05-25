import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export function NewNoteForm() {
  const [text, setText] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      return fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ text: text }),
      })
    },
  })

  const onSubmit = () => {
    mutation.mutate()
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      className="flex gap-2"
    >
      <Input
        name={"body"}
        placeholder="メモ"
        value={text}
        onChange={(event) => {
          setText(event.target.value)
        }}
      />
      <Button type={"submit"}>{"追加"}</Button>
    </form>
  )
}
