"use client"

import * as React from "react"
import { UAParser } from "ua-parser-js"
import { 
  Monitor, 
  Smartphone, 
  Cpu, 
  Globe, 
  Settings, 
  Laptop,
  Tablet,
  Search
} from "lucide-react"

interface UAParserProps {
  userAgent: string
}

import { useTranslations } from "next-intl"

export function UAParserComponent({ userAgent }: UAParserProps) {
  const t = useTranslations("UAInfo")
  const parser = React.useMemo(() => new UAParser(userAgent), [userAgent])
  const result = React.useMemo(() => parser.getResult(), [parser])

  const getDeviceIcon = () => {
    switch (result.device.type) {
      case "mobile":
        return <Smartphone className="h-5 w-5" />
      case "tablet":
        return <Tablet className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <UAInfoCard
          icon={<Globe className="h-5 w-5" />}
          label={t("browser.label")}
          value={result.browser.name || t("unknown")}
          subValue={result.browser.version}
          description={t("browser.description")}
        />
        <UAInfoCard
          icon={<Settings className="h-5 w-5" />}
          label={t("os.label")}
          value={result.os.name || t("unknown")}
          subValue={result.os.version}
          description={t("os.description")}
        />
        <UAInfoCard
          icon={getDeviceIcon()}
          label={t("device.label")}
          value={result.device.model || result.device.vendor || t("device.desktop")}
          subValue={result.device.type || t("device.computer")}
          description={t("device.description")}
        />
        <UAInfoCard
          icon={<Cpu className="h-5 w-5" />}
          label={t("engine.label")}
          value={result.engine.name || t("unknown")}
          subValue={result.engine.version}
          description={t("engine.description")}
        />
      </div>

      <div className="max-w-6xl mx-auto rounded-3xl border border-border bg-muted/30 p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-2 flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground">{t("raw.title")}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("raw.description")}
            </p>
            <div className="mt-4 p-4 rounded-xl bg-background/50 border border-border font-mono text-xs break-all text-muted-foreground leading-normal">
              {userAgent}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UAInfoCard({ 
  icon, 
  label, 
  value, 
  subValue, 
  description 
}: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  subValue?: string,
  description: string 
}) {
  return (
    <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/20">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl font-bold text-foreground tracking-tight">
            {value}
          </span>
          {subValue && (
            <span className="text-sm font-medium text-muted-foreground">
              v{subValue}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
