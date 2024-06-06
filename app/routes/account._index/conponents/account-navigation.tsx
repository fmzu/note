import { Link } from "@remix-run/react"
import { LockKeyhole, NotebookPen, Smile, UserRound } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"

export function AccountNavigation() {
  return (
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
      <Link to="/account" className="p-2">
        <Button
          className="flex space-x-2 h-16 w-full items-center"
          variant={"ghost"}
        >
          <UserRound className="w-4 mr-2" />
          {"アカウント"}
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
  )
}
