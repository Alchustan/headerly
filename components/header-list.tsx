"use client"

import * as React from "react"
import { HeaderItem } from "./header-item"
import { Input } from "@/components/ui/input"
import { Search, X, ExternalLink } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslations } from "next-intl"
import { getHeaderInfo } from "@/lib/header-info"

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
  const t = useTranslations("HeaderList")
  const headerT = useTranslations("Headers")
  const [selectedHeader, setSelectedHeader] = React.useState<string | null>(null)

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

  React.useEffect(() => {
    if (selectedHeader && !filteredHeaders.some(([key]) => key === selectedHeader)) setSelectedHeader(null)
  }, [filteredHeaders, selectedHeader])

  const selectedValue = selectedHeader ? headers[selectedHeader] : undefined
  const selectedInfo = selectedHeader ? getHeaderInfo(selectedHeader) : undefined
  const selectedDescription = selectedHeader && headerT.has(selectedHeader.toLowerCase())
    ? headerT(selectedHeader.toLowerCase())
    : headerT("defaultDescription")

  return (
    <div className="flex h-full flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          ref={inputRef}
          placeholder={t("search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label={t("aria")}
          className="h-14 pl-12 pr-24 rounded-2xl border border-border bg-background text-base focus-visible:ring-primary/50 shadow-sm text-foreground placeholder:text-muted-foreground transition-all focus:bg-muted/20"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label={t("clear")}
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

      <div className={selectedHeader ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.4fr)]" : ""}>
        <ScrollArea className="h-[550px] pr-4 -mr-4">
          {filteredHeaders.length > 0 ? (
            <div className="flex flex-col gap-3 pb-6">
            {filteredHeaders.map(([key, value]) => (
              <HeaderItem
                key={key}
                name={key}
                value={value}
                isImportant={IMPORTANT_HEADERS.includes(key.toLowerCase())}
                isSelected={selectedHeader === key}
                onSelect={() => setSelectedHeader(key)}
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
              <p className="text-xl font-bold text-foreground">{t("empty")}</p>
              <p className="text-muted-foreground max-w-[300px]">
                {t("emptyDesc", { query: searchQuery })}
              </p>
            </div>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-sm font-bold text-primary hover:underline"
            >
              {t("clearAll")}
            </button>
          </div>
          )}
        </ScrollArea>

        {selectedHeader && selectedValue !== undefined && selectedInfo && (
          <aside className="h-fit rounded-2xl border border-primary/20 bg-card p-5 shadow-lg lg:sticky lg:top-20" aria-label={t("detailsTitle")}>
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{headerT("infoLabel")}</p>
                <h2 className="mt-1 break-all text-xl font-bold text-foreground">{selectedHeader}</h2>
              </div>
              <button type="button" onClick={() => setSelectedHeader(null)} aria-label={t("closeDetails")} className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-5 break-all rounded-xl bg-muted/40 p-3 font-mono text-sm text-foreground">{selectedValue}</p>
            <p className="mt-5 text-sm font-medium leading-relaxed text-muted-foreground">{selectedDescription}</p>
            {selectedInfo.rfc && (
              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 px-3 py-2 text-sm">
                <span className="font-medium text-muted-foreground">{headerT("rfcLabel")}</span>
                <span className="font-mono font-bold text-foreground">{selectedInfo.rfc}</span>
              </div>
            )}
            {selectedInfo.mdnUrl && (
              <a href={selectedInfo.mdnUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-sm font-bold text-primary hover:underline">
                {headerT("mdnDocs")} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}

