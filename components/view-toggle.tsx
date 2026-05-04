"use client"

import * as React from "react"
import { LayoutList, Code2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ViewToggleProps {
  view: "pretty" | "raw"
  onViewChange: (view: "pretty" | "raw") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full sm:w-auto h-11 rounded-xl bg-muted p-1 border border-border shadow-sm grid grid-cols-2">
        <div className="flex items-center justify-center gap-2 rounded-lg bg-accent text-accent-foreground shadow-sm">
          <LayoutList className="h-4 w-4" />
          <span className="leading-none text-sm font-medium">Pretty</span>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-lg text-foreground/60">
          <Code2 className="h-4 w-4" />
          <span className="leading-none text-sm font-medium">Raw JSON</span>
        </div>
      </div>
    )
  }

  return (
    <Tabs
      id="view-mode-toggle"
      value={view}
      onValueChange={(v) => onViewChange(v as "pretty" | "raw")}
      className="w-full sm:w-auto"
    >
      <TabsList className="grid w-full grid-cols-2 h-11 rounded-xl bg-muted p-1 border border-border shadow-sm">
        <TabsTrigger 
          value="pretty" 
          className="h-full flex items-center justify-center gap-2 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-sm transition-all"
        >
          <LayoutList className="h-4 w-4" />
          <span className="leading-none">Pretty</span>
        </TabsTrigger>
        <TabsTrigger 
          value="raw" 
          className="h-full flex items-center justify-center gap-2 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-sm transition-all"
        >
          <Code2 className="h-4 w-4" />
          <span className="leading-none">Raw JSON</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
