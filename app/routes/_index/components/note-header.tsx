import { Separator } from "~/components/ui/separator"
import { AvatarPopover } from "./avatar-popover"
import { useSession } from "@hono/auth-js/react"
import { LoginDialog } from "./login-dialog"
import { SignUpDialog } from "./sign-up-dialog"
import { SearchBox } from "./search-box"

export function NoteHeader() {
  const session = useSession()

  return (
    <div className="flex flex-col">
      <div className="p-4 h-16 flex justify-between items-center space-x-4">
        <SearchBox />
        {session.status === "unauthenticated" ? (
          <div className="flex space-x-2">
            <LoginDialog />
            <SignUpDialog />
          </div>
        ) : (
          <AvatarPopover />
        )}
      </div>
      <Separator />
    </div>
  )
}
