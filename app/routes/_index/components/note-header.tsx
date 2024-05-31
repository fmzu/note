import { Link } from "@remix-run/react"
import { LogIn } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export function NoteHeader() {
  return (
    <div className="p-4 h-16 bg-lime-300 flex justify-between items-center space-x-4">
      <Input placeholder="検索" className="max-w-4xl" />
      <Link to={"/sign-in"}>
        <Button className="flex justify-center items-center">
          <LogIn className="w-4 mr-2" />
          {"ログイン"}
        </Button>
      </Link>
    </div>
  )
}
