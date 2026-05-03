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
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pretty" className="flex items-center gap-2">
          <LayoutList className="h-4 w-4" />
          <span>Pretty</span>
        </TabsTrigger>
        <TabsTrigger value="raw" className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          <span>Raw JSON</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
