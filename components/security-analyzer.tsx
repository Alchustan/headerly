"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import {
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ExternalLink,
  Loader2,
  Info,
} from "lucide-react"
import { checkSecurityHeaders, type SecurityCheckResult } from "@/app/actions/security-check"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function getGrade(score: number): { label: string; color: string; icon: typeof Shield } {
  if (score >= 80) return { label: "A", color: "text-green-500", icon: ShieldCheck };
  if (score >= 60) return { label: "B", color: "text-lime-500", icon: ShieldCheck };
  if (score >= 40) return { label: "C", color: "text-yellow-500", icon: Shield };
  if (score >= 20) return { label: "D", color: "text-orange-500", icon: ShieldAlert };
  return { label: "F", color: "text-red-500", icon: ShieldX };
}

function statusIcon(status: "pass" | "fail" | "missing") {
  switch (status) {
    case "pass": return <ShieldCheck className="h-5 w-5 text-green-500" />;
    case "fail": return <ShieldAlert className="h-5 w-5 text-orange-500" />;
    case "missing": return <ShieldX className="h-5 w-5 text-red-500" />;
  }
}

export function SecurityAnalyzer() {
  const t = useTranslations("SecurityHeadersPage")
  const [url, setUrl] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<SecurityCheckResult | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await checkSecurityHeaders(url)
      if ("error" in res) {
        setError(res.error)
      } else {
        setResult(res)
      }
    } catch {
      setError(t("error"))
    } finally {
      setLoading(false)
    }
  }

  const grade = result ? getGrade(result.totalScore) : null
  const percentage = result ? Math.round((result.totalScore / result.maxScore) * 100) : 0

  return (
    <div className="space-y-12 w-full max-w-6xl mx-auto">
      <form onSubmit={handleAnalyze} className="flex gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <Input
            type="url"
            placeholder={t("inputPlaceholder")}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-12 h-14 rounded-full border-primary/20 bg-card text-lg focus-visible:ring-primary shadow-sm"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={loading || !url}
          className="h-14 px-8 rounded-full text-base font-medium shadow-md transition-all hover:shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {t("analyzing")}
            </>
          ) : (
            <>
              <Shield className="mr-2 h-5 w-5" />
              {t("analyzeButton")}
            </>
          )}
        </Button>
      </form>

      {error && (
        <div className="p-6 rounded-3xl bg-destructive/10 border border-destructive/20 text-destructive text-center font-medium max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {loading && !result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-6 h-40" />
          ))}
        </div>
      )}

      {result && (
        <>
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="relative flex flex-col items-center">
                <svg viewBox="0 0 100 55" className="w-48 overflow-visible drop-shadow-sm">
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-muted/50"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-primary transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                    strokeDasharray="125.66"
                    strokeDashoffset={125.66 - (125.66 * percentage) / 100}
                  />
                </svg>
                <div className="absolute bottom-0 flex flex-col items-center">
                  <span className="text-4xl font-bold text-foreground">
                    {percentage}%
                  </span>
                </div>
              </div>

              {grade && (
                <div className="flex flex-col items-center gap-2">
                  <span className={`text-7xl font-black tracking-tight ${grade.color}`}>
                    {grade.label}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{t("grade")}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium">{t("scannedUrl")}:</span>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-primary hover:underline"
              >
                {result.domain}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="flex justify-between w-full max-w-[240px] text-xs font-semibold text-muted-foreground">
              <span>{t("poor")}</span>
              <span>{t("excellent")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.headers.map((header) => (
              <div
                key={header.id}
                className={`group rounded-3xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                  header.status === "pass"
                    ? "border-green-500/20 bg-green-500/5"
                    : header.status === "fail"
                      ? "border-orange-500/20 bg-orange-500/5"
                      : "border-red-500/20 bg-red-500/5"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{header.name}</span>
                        <span className="text-xs text-muted-foreground">({header.score}/{header.maxScore})</span>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground cursor-help hover:text-primary transition-colors">
                            {t("whatIsThis")}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[280px] p-4 text-sm leading-relaxed rounded-xl shadow-lg border-primary/20">
                          <p>{header.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {statusIcon(header.status)}
                  </div>
                </div>

                <div className="space-y-3">
                  {header.value ? (
                    <div className="p-3 bg-muted/50 rounded-xl font-mono text-xs break-all text-foreground/80">
                      {header.value.length > 120 ? header.value.slice(0, 120) + "..." : header.value}
                    </div>
                  ) : (
                    <div className="p-3 bg-muted/30 rounded-xl text-xs text-muted-foreground italic">
                      {t("notPresent")}
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {header.detail}
                    </p>
                  </div>

                  {header.status !== "pass" && (
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-orange-500" />
                      <p className="text-xs text-orange-600 dark:text-orange-400 leading-relaxed font-medium">
                        {t("recommendation")}: {header.recommendation}
                      </p>
                    </div>
                  )}

                  <a
                    href={header.mdnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    MDN Docs <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
