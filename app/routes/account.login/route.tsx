import {} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { AccountNavigation } from "../account._index/components/account-navigation"

export default function AccountLoginPage() {
  return (
    <div>
      <Separator />
      <div className="flex">
        <AccountNavigation />
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="w-full p-4 space-y-8">
          <p className="text-3xl font-bold">{"ユーザID"}</p>
          <div className="flex flex-col space-y-2">
            <p className="font-bold">{"現在のユーザID"}</p>
            <Input className="w-80" defaultValue={"現在のユーザID"} />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="font-bold">{"変更後のユーザID"}</p>
            <Input className="w-80" placeholder={"変更後のユーザID"} />
          </div>
          <Button className="w-80">{"変更を保存"}</Button>
        </div>
      </div>
    </div>
  )
}
