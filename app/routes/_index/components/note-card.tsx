import { useMutation } from "@tanstack/react-query"
import { Trash2, ArchiveRestore, Bookmark, BookmarkCheck } from "lucide-react"
import { useState } from "react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"

type Props = {
  id: string
  text: string
  onRefetch(): void
}

export function NoteCard(props: Props) {
  const mutation = useMutation({
    async mutationFn() {
      return fetch("/api/posts", {
        method: "DELETE",
        body: JSON.stringify({ uuid: props.id }),
      })
    },
  })

  const onDelete = async () => {
    await mutation.mutateAsync()
    props.onRefetch()
  }

  const [isBookmarked, setBookmarked] = useState(true)

  const onBookmark = () => {
    setBookmarked(!isBookmarked)
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-end">
          <Button
            className="rounded-full"
            variant={"secondary"}
            size={"icon"}
            onClick={() => {
              console.log("bookmark")
              onBookmark()
            }}
          >
            {isBookmarked ? (
              <Bookmark className="w-4" />
            ) : (
              <BookmarkCheck className="w-4" />
            )}
          </Button>
        </div>
        <p>{props.text}</p>
        <div className="flex flex-wrap gap-1">
          <Badge>{"タグ"}</Badge>
          <Badge>{"タグ"}</Badge>
        </div>
        <div className="flex justify-end">
          <Button
            className="rounded-full"
            variant={"secondary"}
            size={"icon"}
            onClick={() => {
              console.log("archieve")
            }}
          >
            <ArchiveRestore className="w-4" />
          </Button>
          <Button
            className="rounded-full"
            variant={"secondary"}
            size={"icon"}
            onClick={() => {
              onDelete()
            }}
          >
            <Trash2 className="w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
