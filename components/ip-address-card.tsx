"use client"

import * as React from "react"
import { Server, ShieldCheck, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface IPAddressCardProps {
  initialIp: string
}

export function IPAddressCard({ initialIp }: IPAddressCardProps) {
  const isIPv6 = initialIp.includes(":")
  const protocol = isIPv6 ? "IPv6" : "IPv4"

  return (
    <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Server className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Public IP Address
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-muted-foreground/40 hover:text-primary transition-colors cursor-help">
              <Info className="h-4 w-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[200px] text-xs">
            <p>Your current connection is using {protocol}. This is the unique identifier your browser sent to our server.</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Connection Protocol</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isIPv6 ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
              {protocol}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-foreground tracking-tight break-all leading-tight">
              {initialIp}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
              <ShieldCheck className="h-3 w-3" />
              <span>Verified Connection</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 leading-relaxed opacity-70">
        Extracted directly from your request metadata. No third-party APIs or external services are used for this detection.
      </p>
    </div>
  )
}
