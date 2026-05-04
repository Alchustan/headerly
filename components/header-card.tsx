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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

  const jsonString = React.useMemo(() => JSON.stringify(headers, null, 2), [headers])

  const downloadJson = React.useCallback(() => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `headers-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [jsonString])

  const headerCount = Object.keys(headers).length

  return (
    <Card className="mx-auto w-full max-w-6xl rounded-2xl border border-border bg-card shadow-lg dark:shadow-none overflow-hidden">
      <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 border-b border-border bg-muted/5 pb-6">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight text-card-foreground flex items-center gap-2">
            Request Headers
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {headerCount}
            </span>
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            Detecting active browser and connection headers
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ViewToggle view={view} onViewChange={setView} />
          <div className="flex items-center gap-2 sm:ml-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  aria-label="Refresh headers"
                  className="rounded-xl border-border bg-background shadow-sm active:scale-95 transition-all"
                >
                  <RefreshCw className={`h-4 w-4 text-muted-foreground ${isRefreshing ? "animate-spin" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Refresh headers</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={downloadJson} 
                  aria-label="Download as JSON"
                  className="rounded-xl border-border bg-background shadow-sm active:scale-95 transition-transform"
                >
                  <Download className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Download JSON</p>
              </TooltipContent>
            </Tooltip>

            <CopyButton 
              value={jsonString} 
              copyMessage="Copy full JSON" 
              variant="outline"
              className="rounded-xl border-border bg-background shadow-sm active:scale-95 transition-transform"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {view === "pretty" ? (
          <HeaderList headers={headers} />
        ) : (
          <div className="relative rounded-2xl border border-border bg-muted/30 p-1">
            <ScrollArea className="h-[550px] w-full rounded-xl font-mono text-sm">
              <div className="p-6">
                <JsonView data={headers} />
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

