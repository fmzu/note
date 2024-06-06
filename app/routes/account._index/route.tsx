import { Separator } from "~/components/ui/separator"
import { Link } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { LockKeyhole, NotebookPen, Smile } from "lucide-react"

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
        <div className="w-full">{""}</div>
      </div>
    </div>
  )
}
