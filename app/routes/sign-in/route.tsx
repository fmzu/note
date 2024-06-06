import { Link, useNavigate } from "@remix-run/react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { client } from "~/lib/client"
import { toast } from "sonner"

export default function LoginPage() {
  const navigate = useNavigate()

  const [loginId, setLoginId] = useState("")

  const [loginPassword, setLoginPassword] = useState("")

  const mutation = useMutation({
    async mutationFn() {
      const resp = await client.api.auth.sign.in.$post({
        json: {
          login: loginId,
          password: loginPassword,
        },
      })
      const json = await resp.json()
      return json
    },
  })

  const onSubmit = async () => {
    const result = await mutation.mutateAsync()
    if (result.message === null) {
      navigate("/")
      return
    }
    toast(result.message)
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
        <Button type={"submit"}>{"追加"}</Button>
      </form>
      <Link to={"/sign-up"}>
        <Button>{"sign-up"}</Button>
      </Link>
      <Link to={"/sign-in"}>
        <Button>{"sign-in"}</Button>
      </Link>
      <Link to={"/"}>
        <Button>{"home"}</Button>
      </Link>
    </div>
  )
}
