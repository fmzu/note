import { Link } from "@remix-run/react"
import { LogIn } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { AvatarPopover } from "./avatar-popover"
import { useSession } from "@hono/auth-js/react"

export function NoteHeader() {
  const session = useSession()

  return (
    <div className="flex flex-col">
      <div className="p-4 h-16 flex justify-between items-center space-x-4">
        <Input placeholder="検索" className="max-w-4xl" />
        {session.status === "unauthenticated" ? (
          <Link to={"/sign-in"}>
            <Button className="flex justify-center items-center">
              <LogIn className="w-4 mr-2" />
              {"ログイン"}
            </Button>
          </Link>
        ) : (
          <AvatarPopover />
        )}
      </div>
      <Separator />
    </div>
  )
}
