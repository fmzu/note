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
        <div className="flex flex-col space-y-4">
          <div>
            <p className="text-sm font-bold">{"表示名"}</p>
            <Input defaultValue="現在のアカウント名" className="w-80" />
          </div>
          <Button>{"変更"}</Button>
        </div>
      </div>
    </div>
  )
}
