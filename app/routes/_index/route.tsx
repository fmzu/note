import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent } from "~/components/ui/card"
import { drizzle } from "drizzle-orm/d1"
import { postsTable } from "~/schema"
import { useLoaderData } from "@remix-run/react"
import { NewNoteForm } from "./components/new-note-form"
import { desc } from "drizzle-orm"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ]
}

export async function loader(props: LoaderFunctionArgs) {
  const database = drizzle(props.context.cloudflare.env.DB)

  const allPosts = await database
    .select()
    .from(postsTable)
    .orderBy(desc(postsTable.text))
    .all()

  return { posts: allPosts }
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="p-4 space-y-4">
      <NewNoteForm />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.posts.map((post) => (
          <Card key={post.uuid}>
            <CardContent className="p-4 space-y-2">
              <p>{post.text}</p>
              <div className="flex flex-wrap gap-1">
                <Badge>{"タグ"}</Badge>
                <Badge>{"タグ"}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
