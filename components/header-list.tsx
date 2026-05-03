"use client"

import * as React from "react"
import { HeaderItem } from "./header-item"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface HeaderListProps {
  headers: Record<string, string>
}

const IMPORTANT_HEADERS = [
  "user-agent",
  "x-forwarded-for",
  "cf-connecting-ip",
  "host",
  "accept-language",
  "referer",
]

export function HeaderList({ headers }: HeaderListProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredHeaders = React.useMemo(() => {
    const entries = Object.entries(headers)
    if (!searchQuery) return entries

    const query = searchQuery.toLowerCase()
    return entries.filter(
      ([key, value]) =>
        key.toLowerCase().includes(query) || value.toLowerCase().includes(query)
    )
  }, [headers, searchQuery])

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search headers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <ScrollArea className="h-[500px] pr-4">
        {filteredHeaders.length > 0 ? (
          <div className="flex flex-col gap-1">
            {filteredHeaders.map(([key, value]) => (
              <HeaderItem
                key={key}
                name={key}
                value={value}
                isImportant={IMPORTANT_HEADERS.includes(key.toLowerCase())}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] flex-col items-center justify-center gap-2 text-center">
            <Search className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No headers found matching your search.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
