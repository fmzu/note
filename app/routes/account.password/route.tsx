import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { AccountNavigation } from "../account._index/components/account-navigation"

export default function AccountPasswordPage() {
  const [currentEye, setCurrentEye] = useState(true)

  const onCurrentEye = () => {
    setCurrentEye(!currentEye)
  }

  const [newEye, setNewEye] = useState(true)

  const onNewEye = () => {
    setNewEye(!newEye)
  }

  return (
    <div>
      <Separator />
      <div className="flex">
        <AccountNavigation />
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="justify-center w-full">
          <div className="flex flex-col w-full p-4 space-y-8">
            <p className="text-3xl font-bold">{"パスワード"}</p>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">{"現在のパスワード"}</p>
              <div className="flex space-x-2">
                <Input
                  className="w-80"
                  defaultValue={"現在のパスワード"}
                  type={currentEye ? "password" : "text"}
                />
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    onCurrentEye()
                  }}
                >
                  {currentEye ? (
                    <Eye className="w-4" />
                  ) : (
                    <EyeOff className="w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold">{"変更後のパスワード"}</p>
              <div className="flex space-x-2">
                <Input
                  className="w-80"
                  placeholder={"変更後のパスワード"}
                  type="password"
                />
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    onNewEye()
                  }}
                >
                  {newEye ? (
                    <Eye className="w-4" />
                  ) : (
                    <EyeOff className="w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button className="w-80">{"変更を保存"}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
