import { Separator } from "~/components/ui/separator"
import { AccountNavigation } from "./conponents/account-navigation"

export default function AccountLoginPage() {
  return (
    <div>
      <div className="p-4 h-16 bg-lime-300 flex justify-between items-center space-x-4">
        {"Header"}
      </div>
      <div className="flex">
        <AccountNavigation />
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="w-full">{"アカウント名とアイコンの変更"}</div>
      </div>
    </div>
  )
}
