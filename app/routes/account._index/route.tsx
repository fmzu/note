import { Separator } from "~/components/ui/separator"
import { AccountNavigation } from "./components/account-navigation"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

export default function AccountLoginPage() {
  return (
    <div>
      <Separator />
      <div className="flex">
        <AccountNavigation />
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="flex flex-col p-4 space-y-8 w-full">
          <p className="text-3xl font-bold">{"アカウント"}</p>
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-2">
                <p className="font-bold">{"現在の表示名"}</p>
                <Input defaultValue="現在の表示名" className="w-80" />
              </div>
              <div className="flex flex-col space-y-2">
                <p className="font-bold">{"変更後の表示名"}</p>
                <Input defaultValue="変更後の表示名" className="w-80" />
              </div>
              <Button>{"変更"}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
