import { useMutation } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
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

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-end">
          <Button
            className="rounded-full"
            variant={"secondary"}
            size={"icon"}
            onClick={() => {
              console.log("delete")
              onDelete()
            }}
          >
            <Trash2 className="w-4" />
          </Button>
        </div>
        <p>{props.text}</p>
        <div className="flex flex-wrap gap-1">
          <Badge>{"タグ"}</Badge>
          <Badge>{"タグ"}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
