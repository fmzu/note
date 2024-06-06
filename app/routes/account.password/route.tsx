import { Link } from "@remix-run/react"
import { Eye, EyeOff, LockKeyhole, NotebookPen, Smile } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"

export default function AccountPasswordPage() {
  const [correnteye, setCorrentEye] = useState(true)

  const onCorrentEye = () => {
    setCorrentEye(!correnteye)
  }

  const [newEye, setNewEye] = useState(true)

  const onNewEye = () => {
    setNewEye(!newEye)
  }

  return (
    <div>
      <div className="p-4 h-16 bg-lime-300 flex justify-between items-center space-x-4">
        {"Header"}
      </div>
      <div className="flex">
        <div className="flex flex-col w-64 h-screen">
          <Link to="/" className="p-2">
            <Button
              className="flex space-x-2 h-16 w-full items-center"
              variant={"ghost"}
            >
              <NotebookPen className="w-4 mr-2" />
              {"ノート"}
            </Button>
          </Link>
          <Separator />
          <Link to="/account/login" className="p-2">
            <Button
              className="flex space-x-2 h-16 w-full items-center"
              variant={"ghost"}
            >
              <Smile className="w-4 mr-2" />
              {"ユーザID"}
            </Button>
          </Link>
          <Separator />
          <Link to="/account/password" className="p-2">
            <Button
              className="flex space-x-2 h-16 w-full items-center"
              variant={"ghost"}
            >
              <LockKeyhole className="w-4 mr-2" />
              {"パスワード"}
            </Button>
          </Link>
          <Separator />
        </div>
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="w-full p-4 space-y-8">
          <p className="text-3xl font-bold">{"パスワード"}</p>
          <div className="flex flex-col space-y-2">
            <p>{"現在のパスワード"}</p>
            <div className="flex space-x-2">
              <Input
                className="w-80"
                placeholder={"現在のパスワード"}
                type="password"
              />
              <Button
                variant={"ghost"}
                onClick={() => {
                  onCorrentEye()
                }}
              >
                {correnteye ? (
                  <Eye className="w-4" />
                ) : (
                  <EyeOff className="w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <p>{"新しいパスワード"}</p>
            <div className="flex space-x-2">
              <Input
                className="w-80"
                placeholder={"新しいパスワード"}
                type="password"
              />
              <Button
                variant={"ghost"}
                onClick={() => {
                  onNewEye()
                }}
              >
                {newEye ? <Eye className="w-4" /> : <EyeOff className="w-4" />}
              </Button>
            </div>
          </div>
          <Button>{"変更を保存"}</Button>
        </div>
      </div>
    </div>
  )
}
