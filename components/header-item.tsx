"use client"

import * as React from "react"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Info, ExternalLink } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getHeaderInfo } from "@/lib/header-info"

interface HeaderItemProps {
  name: string
  value: string
  isImportant?: boolean
}

export function HeaderItem({ name, value, isImportant }: HeaderItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const isLong = value.length > 100
  const headerInfo = getHeaderInfo(name)

  return (
    <div
      className={cn(
        "group flex flex-col gap-2 border border-border py-4 px-4 bg-card transition-all hover:bg-muted/50 rounded-2xl shadow-sm",
        isImportant && "bg-primary/5 border-primary/10 shadow-primary/5"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#FFF0E8] dark:bg-black/20 border border-transparent dark:border-white/5">
            <span className="shrink-0 text-sm font-medium text-[#4F46E5] dark:text-zinc-400">
              {name}
            </span>
            <Tooltip delayDuration={400}>
              <TooltipTrigger asChild>
                <button className="shrink-0 text-zinc-400 hover:text-primary transition-all focus:outline-none hover:scale-110 active:scale-95">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Information about {name}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                sideOffset={8}
                className="max-w-[320px] px-4 py-4 bg-card/95 backdrop-blur-sm border border-border text-foreground shadow-xl rounded-2xl"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">Header Info</span>
                    </div>
                    {headerInfo.mdnUrl && (
                      <a 
                        href={headerInfo.mdnUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline"
                      >
                        MDN <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed font-medium">
                    {headerInfo.description}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>

          {isImportant && (
            <Badge variant="outline" className="h-5 px-1.5 text-[10px] uppercase tracking-wider border-primary/20 text-primary bg-[#FFF0E8] dark:bg-primary/5 rounded-xl">
              Important
            </Badge>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 active:scale-95">
          <CopyButton value={value} copyMessage={`Copy ${name}`} />
        </div>
      </div>
      
      <div className="relative">
        <div
          className={cn(
            "break-all font-mono text-sm leading-relaxed text-foreground rounded-xl p-1",
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
