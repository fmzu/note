import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Input } from "~/components/ui/input"
import { client } from "~/lib/client"

export function SignUpDialog() {
  const [loginId, setLoginId] = useState("")

  const [loginPassword, setLoginPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.users.$post({
        json: {
          email: loginId,
          password: loginPassword,
        },
      })
      const json = await resp.json()
      return json
    },
  })

  const onSubmit = () => {
    mutation.mutate()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">{"無料登録"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            {"無料登録"}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit()
            }}
            className="space-y-4"
          >
            <Input
              type="email"
              name={"body"}
              placeholder="ログインID"
              value={loginId}
              onChange={(event) => {
                setLoginId(event.target.value)
              }}
            />
            <Input
              type="password"
              name={"body"}
              placeholder="パスワード"
              value={loginPassword}
              onChange={(event) => {
                setLoginPassword(event.target.value)
              }}
            />
            <div className="flex flex-1 justify-end">
              <Button type={"submit"}>{"登録"}</Button>
            </div>
          </form>
          <div className="flex space-x-2 items-center">
            <p className="text-sm">{"アカウントをお持ちの場合:"}</p>
            <p className="text-blue-400 text-sm">{"ログイン"}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
