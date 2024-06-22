import { useMutation } from "@tanstack/react-query"
import { ImagePlus } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { hc } from "hono/client"
import type { Api } from "api/route"
import { accessTokenCookie } from "~/lib/access-token-cookie"
import { useSession } from "@hono/auth-js/react"
import { toast } from "sonner"

type Props = {
  onRefetch(): void
}

export function NewNoteForm(props: Props) {
  const [text, setText] = useState("")

  const session = useSession()

  const mutation = useMutation({
    async mutationFn() {
      const client = hc<Api>("/")
      const accessToken = await accessTokenCookie.parse(document.cookie)
      const result = await client.api.posts.$post({
        json: { text },
      })
      return await result.json()
    },
  })

  const isSendButtonEnabled = text.trim() !== "" && text.length > 0

  const onSubmit = async () => {
    await mutation.mutateAsync()
    props.onRefetch()
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      className="flex gap-2 items-end"
    >
      <Textarea
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
        disabled={!isSendButtonEnabled}
        onClick={() => {
          session.status !== "authenticated" && toast("ログインしてください")
        }}
      >
        {"追加"}
      </Button>
    </form>
  )
}
