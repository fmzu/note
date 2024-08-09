import { useState } from "react"
import { Input } from "~/components/ui/input"

export function SearchBox() {
  const [search, setSearch] = useState("")

  const onSearch = () => {
    if (search.trim() !== "") {
      // ここで検索処理を行う
      console.log(`Searching for: ${search}`)
      setSearch("") // 検索後にリセット
    }
  }

  return (
    <Input
      placeholder="検索"
      className="max-w-4xl"
      onChange={(e) => {
        setSearch(e.target.value)
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch()
        }
      }}
    />
  )
}
