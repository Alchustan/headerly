"use client"

import * as React from "react"
import { LayoutList, Code2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ViewToggleProps {
  view: "pretty" | "raw"
  onViewChange: (view: "pretty" | "raw") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <Tabs
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
