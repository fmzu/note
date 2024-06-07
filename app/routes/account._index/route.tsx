import { Separator } from "~/components/ui/separator"
import { AccountNavigation } from "./components/account-navigation"
import { AvatarPopover } from "../_index/components/avatar-popover"
import { AccountArticle } from "./components/account-article"

export default function AccountLoginPage() {
  return (
    <div>
      <div className="p-4 h-16 flex justify-between items-center space-x-4">
        <p>{"Header"}</p>
        <AvatarPopover />
      </div>
      <Separator />
      <div className="flex">
        <AccountNavigation />
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="justify-center w-full">
          <AccountArticle />
        </div>
      </div>
    </div>
  )
}
