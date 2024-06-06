import {} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { AccountNavigation } from "../account._index/components/account-navigation"
import { AvatarPopover } from "../_index/components/avatar-popover"

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
