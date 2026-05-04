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
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === "Escape") {
        setSearchQuery("")
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

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
    <div className="flex h-full flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          ref={inputRef}
          placeholder="Search headers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search request headers"
          className="h-14 pl-12 pr-24 rounded-2xl border border-border bg-background text-base focus-visible:ring-primary/50 shadow-sm text-foreground placeholder:text-muted-foreground transition-all focus:bg-muted/20"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground select-none pointer-events-none">
            <span className="text-xs">⌘</span>K
          </div>
        </div>
      </div>

      <ScrollArea className="h-[550px] pr-4 -mr-4">
        {filteredHeaders.length > 0 ? (
          <div className="flex flex-col gap-3 pb-6">
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
          <div className="flex h-[400px] flex-col items-center justify-center gap-6 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
              <Search className="relative h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-foreground">No headers found</p>
              <p className="text-muted-foreground max-w-[300px]">
                No headers match "{searchQuery}". Try a different keyword or clear the search.
              </p>
            </div>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-sm font-bold text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

