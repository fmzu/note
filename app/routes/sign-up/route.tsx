import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export default function LoginPage() {
  const [loginId, setLoginId] = useState("")

  const [loginPassword, setLoginPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      return fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({
          login: loginId,
          password: loginPassword,
        }),
      })
    },
  })

  const onSubmit = () => {
    mutation.mutate()
  }

  return (
    <div className="p-4 space-y-4">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
        className="space-y-4"
      >
        <Input
          name={"body"}
          placeholder="ログインID"
          value={loginId}
          onChange={(event) => {
            setLoginId(event.target.value)
          }}
        />
        <Input
          name={"body"}
          placeholder="パスワード"
          value={loginPassword}
          onChange={(event) => {
            setLoginPassword(event.target.value)
          }}
        />
        <Button type={"submit"}>{"追加"}</Button>
      </form>
    </div>
  )
}
