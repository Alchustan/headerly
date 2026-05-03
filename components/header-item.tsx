"use client"

import * as React from "react"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getHeaderDescription } from "@/lib/header-info"

interface HeaderItemProps {
  name: string
  value: string
  isImportant?: boolean
}

export function HeaderItem({ name, value, isImportant }: HeaderItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const isLong = value.length > 100
  const description = getHeaderDescription(name)

  return (
    <div
      className={cn(
        "group flex flex-col gap-2 rounded-lg border border-transparent p-3 transition-all hover:border-border hover:bg-muted/50",
        isImportant && "bg-primary/5 border-primary/10"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="shrink-0 text-sm font-semibold text-muted-foreground">
            {name}:
          </span>
          
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <button className="shrink-0 text-muted-foreground/50 hover:text-primary transition-colors focus:outline-none">
                <Info className="h-3.5 w-3.5" />
                <span className="sr-only">Information about {name}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs text-xs">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>

          {isImportant && (
            <Badge variant="outline" className="h-5 px-1.5 text-[10px] uppercase tracking-wider">
              Important
            </Badge>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyButton value={value} copyMessage={`Copy ${name}`} />
        </div>
      </div>
      
      <div className="relative">
        <div
          className={cn(
            "break-all font-mono text-sm leading-relaxed text-foreground",
            !isExpanded && isLong && "line-clamp-2"
          )}
        >
          {value}
        </div>
        
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                Show more
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
