import { Separator } from "~/components/ui/separator"
import { AccountNavigation } from "./components/account-navigation"
import { AccountArticle } from "./components/account-article"

export default function AccountLoginPage() {
  return (
    <div>
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
