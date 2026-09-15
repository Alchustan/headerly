"use client"

import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"

interface HeaderItemProps {
  name: string
  value: string
  isImportant?: boolean
  isSelected?: boolean
  onSelect: () => void
}

export function HeaderItem({ name, value, isImportant, isSelected, onSelect }: HeaderItemProps) {
  const t = useTranslations("Headers")
  const common = useTranslations("Common")

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect()
        }
      }}
      aria-pressed={isSelected}
      className={cn(
        "group flex cursor-pointer flex-col gap-2 rounded-2xl border bg-card px-4 py-4 text-left shadow-sm transition-all hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isImportant && "border-primary/10 bg-primary/5 shadow-primary/5",
        isSelected && "border-primary bg-primary/10 ring-1 ring-primary/30"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="min-w-0 max-w-full truncate rounded-xl border border-primary/10 bg-primary/5 px-2.5 py-1 text-[15px] font-bold text-primary dark:bg-primary/10">
            {name}
          </span>
          {isImportant && (
            <Badge variant="outline" className="h-5 shrink-0 rounded-xl border-primary/20 bg-primary/5 px-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              {t("importantBadge")}
            </Badge>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <div onClick={(event) => event.stopPropagation()}>
            <CopyButton value={value} copyMessage={name} toastMessage={common("copied")} />
          </div>
        </div>
      </div>

      <div className="break-all rounded-xl p-1 font-mono text-[15px] leading-relaxed text-foreground">
        {value}
      </div>
    </div>
  )
}
