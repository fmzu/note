import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { useNavigate } from "@remix-run/react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { signIn } from "@hono/auth-js/react"
import { Input } from "~/components/ui/input"

export function LoginDialog() {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")

  const [loginPassword, setLoginPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await signIn("credentials", {
        email: loginId,
        password: loginPassword,
        redirect: false,
      })
      if (resp?.status !== 200) {
        return "ログインに失敗しました"
      }
      return null
    },
  })

  const onSubmit = async () => {
    const result = await mutation.mutateAsync()
    if (result === null) {
      navigate("/")
      return
    }
    toast(result)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{"ログイン"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            {"ログイン"}
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
              <Button type={"submit"}>{"ログイン"}</Button>
            </div>
          </form>
          <p className="text-blue-400 text-sm">{"アカウント登録はこちら"}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
