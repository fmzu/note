import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { hc } from "hono/client"
import type { Api } from "api/route"
import { accessTokenCookie } from "~/lib/access-token-cookie"
import { useSession } from "@hono/auth-js/react"
import { toast } from "sonner"
import { ImageUploadButton } from "./image-upload-button"
import { Card, CardContent } from "~/components/ui/card"

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
    <Card>
      <CardContent className="pt-6">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
          className="flex flex-col gap-2 items-end"
        >
          <Textarea
            name={"body"}
            placeholder="メモ"
            value={text}
            onChange={(event) => {
              setText(event.target.value)
            }}
          />
          <div className="flex space-x-2 items-center justify-center">
            <ImageUploadButton />
            <Button
              type={"submit"}
              disabled={!isSendButtonEnabled}
              onClick={() => {
                session.status !== "authenticated" &&
                  toast("ログインしてください")
              }}
            >
              {"追加"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
