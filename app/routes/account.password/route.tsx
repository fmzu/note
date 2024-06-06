import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { AccountNavigation } from "../account._index/components/account-navigation"
import { AvatarPopover } from "../_index/components/avatar-popover"

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
      <div className="p-4 h-16 flex justify-between items-center space-x-4">
        <p>{"Header"}</p>
        <AvatarPopover />
      </div>
      <Separator />
      <div className="flex">
        <AccountNavigation />
        <Separator style={{ height: "initial" }} orientation="vertical" />
        <div className="w-full p-4 space-y-8">
          <p className="text-3xl font-bold">{"パスワード"}</p>
          <div className="flex flex-col space-y-2">
            <p>{"現在のパスワード"}</p>
            <div className="flex space-x-2">
              <Input
                className="w-80"
                placeholder={"現在のパスワード"}
                type="password"
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
            <p>{"新しいパスワード"}</p>
            <div className="flex space-x-2">
              <Input
                className="w-80"
                placeholder={"新しいパスワード"}
                type="password"
              />
              <Button
                variant={"ghost"}
                onClick={() => {
                  onNewEye()
                }}
              >
                {newEye ? <Eye className="w-4" /> : <EyeOff className="w-4" />}
              </Button>
            </div>
          </div>
          <Button>{"変更を保存"}</Button>
        </div>
      </div>
    </div>
  )
}
