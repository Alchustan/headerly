"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ViewToggle } from "./view-toggle"
import { HeaderList } from "./header-list"
import { CopyButton } from "./copy-button"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

import { JsonView } from "./json-view"

interface HeaderCardProps {
  headers: Record<string, string>
}

export function HeaderCard({ headers }: HeaderCardProps) {
  const [view, setView] = React.useState<"pretty" | "raw">("pretty")
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const router = useRouter()

  const handleRefresh = () => {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => setIsRefreshing(false), 600)
  }

  const jsonString = JSON.stringify(headers, null, 2)

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "headers.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="mx-auto w-full max-w-6xl rounded-2xl border border-border bg-card shadow-lg dark:shadow-none">
      <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 border-b border-border pb-6">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight text-card-foreground">Request Headers</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            {Object.keys(headers).length} headers detected
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ViewToggle view={view} onViewChange={setView} />
          <div className="flex items-center gap-2 ml-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`rounded-xl border-border bg-background shadow-sm active:scale-95 transition-transform ${isRefreshing ? "animate-spin" : ""}`}
            >
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="outline" size="icon" onClick={downloadJson} className="rounded-xl border-border bg-background shadow-sm active:scale-95 transition-transform">
              <Download className="h-4 w-4 text-muted-foreground" />
            </Button>
            <div className="active:scale-95 transition-transform shadow-sm rounded-xl bg-background">
              <CopyButton value={jsonString} copyMessage="Copy full JSON" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {view === "pretty" ? (
          <HeaderList headers={headers} />
        ) : (
          <div className="relative rounded-lg border bg-muted/30 p-1">
            <ScrollArea className="h-[500px] w-full rounded-md font-mono text-sm">
              <JsonView data={headers} />
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
