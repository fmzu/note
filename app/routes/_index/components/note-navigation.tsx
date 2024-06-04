import { Link } from "@remix-run/react"
import { ArchiveRestore, Bell, NotebookPen, Trash2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"

export function NoteNavigation() {
  return (
    <div className="flex flex-col w-64 h-screen">
      <Link to="/" className="p-2">
        <Button
          className="flex space-x-2 h-16 w-full items-center"
          variant={"ghost"}
        >
          <NotebookPen className="w-4 mr-2" />
          {"ノート"}
        </Button>
      </Link>
      <Separator />
      <Link to="/notification" className="p-2">
        <Button
          className="flex space-x-2 h-16 w-full items-center"
          variant={"ghost"}
        >
          <Bell className="w-4 mr-2" />
          {"通知"}
        </Button>
      </Link>
      <Separator />
      <Link to="/archive" className="p-2">
        <Button
          className="flex space-x-2 h-16 w-full items-center"
          variant={"ghost"}
        >
          <ArchiveRestore className="w-4 mr-2" />
          {"アーカイブ"}
        </Button>
      </Link>
      <Separator />
      <Link to="/delete" className="p-2">
        <Button
          className="flex space-x-2 h-16 w-full items-center"
          variant={"ghost"}
        >
          <Trash2 className="w-4 mr-2" />
          {"ゴミ箱"}
        </Button>
      </Link>
      <Separator />
    </div>
  )
}
