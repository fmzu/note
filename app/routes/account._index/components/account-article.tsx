import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export function AccountArticle() {
  return (
    <div className="flex flex-col p-4 space-y-8">
      <p className="text-3xl font-bold">{"アカウント"}</p>
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-8">
          <div>
            <p className="text-sm font-bold">{"現在の表示名"}</p>
            <Input defaultValue="現在の表示名" className="w-80" />
          </div>
          <div>
            <p className="text-sm font-bold">{"変更後の表示名"}</p>
            <Input defaultValue="変更後の表示名" className="w-80" />
          </div>
          <Button>{"変更"}</Button>
        </div>
      </div>
    </div>
  )
}
