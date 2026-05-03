"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  value: string
  copyMessage?: string
}

export function CopyButton({
  value,
  copyMessage = "Copy to clipboard",
  className,
  variant = "ghost",
  size = "icon",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const copyToClipboard = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setHasCopied(true)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }, [value])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("h-8 w-8 transition-all", className)}
          onClick={copyToClipboard}
          {...props}
        >
          {hasCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">{copyMessage}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{hasCopied ? "Copied!" : copyMessage}</p>
      </TooltipContent>
    </Tooltip>
  )
}
