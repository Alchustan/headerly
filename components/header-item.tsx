"use client"

import * as React from "react"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Info, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getHeaderInfo } from "@/lib/header-info"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTranslations } from "next-intl"

interface HeaderItemProps {
  name: string
  value: string
  isImportant?: boolean
}

export function HeaderItem({ name, value, isImportant }: HeaderItemProps) {
  const [mounted, setMounted] = React.useState(false)
  const t = useTranslations("Headers")
  const headerInfo = getHeaderInfo(name)
  const isMobile = useIsMobile()

  // Try to get translation for the header description, fallback to the hardcoded one or default
  const headerKey = name.toLowerCase()
  const hasTranslation = t.has(headerKey)
  const description = hasTranslation ? t(headerKey) : t("defaultDescription")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const InfoContent = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("infoLabel")}</span>
        </div>
        {headerInfo.mdnUrl && (
          <a
            href={headerInfo.mdnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline bg-primary/10 px-2 py-1 rounded-lg transition-colors"
          >
            {t("mdnDocs")} <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-foreground">{name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground font-medium">
          {description}
        </p>
      </div>
    </div>
  )

  const InfoTrigger = (
    <button
      type="button"
      className="shrink-0 text-zinc-400 hover:text-primary transition-all focus:outline-none hover:scale-110 active:scale-95"
    >
      <Info className="h-4 w-4" />
      <span className="sr-only">Information about {name}</span>
    </button>
  )

  return (
    <div
      className={cn(
        "group flex flex-col gap-2 border border-border py-4 px-4 bg-card transition-all hover:bg-muted/50 rounded-2xl shadow-sm",
        isImportant && "bg-primary/5 border-primary/10 shadow-primary/5"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10 min-w-0 max-w-full">
            <span className="truncate text-[15px] font-bold text-primary min-w-0">
              {name}
            </span>
            {mounted ? (
              isMobile ? (
                <Dialog>
                  <DialogTrigger asChild>{InfoTrigger}</DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="sr-only">Header Information: {name}</DialogTitle>
                    </DialogHeader>
                    <InfoContent />
                  </DialogContent>
                </Dialog>
              ) : (
                <Tooltip delayDuration={150}>
                  <TooltipTrigger asChild>{InfoTrigger}</TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="w-[320px] px-4 py-4 bg-card/95 backdrop-blur-sm border border-border text-foreground shadow-xl rounded-2xl"
                  >
                    <InfoContent />
                  </TooltipContent>
                </Tooltip>
              )
            ) : (
              InfoTrigger
            )}
          </div>

          {isImportant && (
            <Badge variant="outline" className="h-5 px-1.5 text-[10px] uppercase tracking-wider border-primary/20 text-primary bg-primary/5 rounded-xl shrink-0 font-bold">
              {t("importantBadge")}
            </Badge>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 active:scale-95">
          <CopyButton value={value} copyMessage={`Copy ${name}`} />
        </div>
      </div>

      <div className="relative">
        <div className="break-all font-mono text-[15px] leading-relaxed text-foreground rounded-xl p-1">
          {value}
        </div>
      </div>
    </div>
  )
}
