import { useMutation } from "@tanstack/react-query"
import { ImagePlus } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

type Props = {
  onRefetch(): void
}

export function NewNoteForm(props: Props) {
  const [text, setText] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      return fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ text: text }),
      })
    },
  })

  const isSendButtonEnabled = text.trim() !== "" && text.length > 0

  const onSubmit = () => {
    mutation.mutate()
    props.onRefetch()
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
      <Button disabled variant={"ghost"} className="rounded-full">
        <ImagePlus className="w-4" />
      </Button>
      <Button
        type={"submit"}
        onClick={() => {}}
        disabled={!isSendButtonEnabled}
      >
        {"追加"}
      </Button>
    </form>
  )
}
