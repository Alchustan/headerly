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
    <Card className="mx-auto w-full max-w-4xl border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <CardTitle className="text-xl font-bold tracking-tight">Request Headers</CardTitle>
          <CardDescription>
            {Object.keys(headers).length} headers detected
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ViewToggle view={view} onViewChange={setView} />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={isRefreshing ? "animate-spin" : ""}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={downloadJson}>
              <Download className="h-4 w-4" />
            </Button>
            <CopyButton value={jsonString} copyMessage="Copy full JSON" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
