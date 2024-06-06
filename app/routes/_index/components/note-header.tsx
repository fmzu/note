import { Link } from "@remix-run/react"
import { LogIn } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useContext } from "react"
import { AuthContext } from "~/contexts/auth-context"
import { Separator } from "~/components/ui/separator"
import { AvatarPopover } from "./avatar-popover"

export function NoteHeader() {
  const auth = useContext(AuthContext)

  return (
    <div className="flex flex-col">
      <div className="p-4 h-16 flex justify-between items-center space-x-4">
        <Input placeholder="検索" className="max-w-4xl" />
        {auth.isLoggedIn ? (
          <AvatarPopover />
        ) : (
          <Link to={"/sign-in"}>
            <Button className="flex justify-center items-center">
              <LogIn className="w-4 mr-2" />
              {"ログイン"}
            </Button>
          </Link>
        )}
      </div>
      <Separator />
    </div>
  )
}
