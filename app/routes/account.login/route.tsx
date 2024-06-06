import { Link } from "@remix-run/react"
import { LockKeyhole, NotebookPen, Smile } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"

export default function AccountLoginPage() {
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
          <p className="text-3xl font-bold">{"ユーザID"}</p>
          <div className="flex flex-col space-y-2">
            <p>{"現在のユーザID"}</p>
            <Input className="w-80" placeholder={"現在のユーザID"} />
          </div>
          <div className="flex flex-col space-y-2">
            <p>{"新しいユーザID"}</p>
            <Input className="w-80" placeholder={"ユーザID"} />
          </div>
          <Button>{"変更を保存"}</Button>
        </div>
      </div>
    </div>
  )
}
