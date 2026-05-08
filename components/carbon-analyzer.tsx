"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Search, Leaf, Cloud, Server, Database, Loader2 } from "lucide-react"
import { checkCarbonFootprint, type CarbonCheckResult } from "@/app/actions/carbon-check"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CarbonAnalyzer() {
  const t = useTranslations("GreenWebPage")
  const [url, setUrl] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<CarbonCheckResult | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await checkCarbonFootprint(url)
      if ("error" in res) {
        setError(res.error)
      } else {
        setResult(res)
      }
    } catch (err) {
      setError(t("error"))
    } finally {
      setLoading(false)
    }
  }

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
              <Leaf className="mr-2 h-5 w-5" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-6 h-40" />
          ))}
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ResultCard
            icon={<Leaf className="h-6 w-6" />}
            label={t("results.isGreen.label")}
            value={result.isGreen ? t("results.isGreen.yes") : t("results.isGreen.no")}
            description={result.isGreen ? t("results.isGreen.descGreen") : t("results.isGreen.descNotGreen")}
            isSuccess={result.isGreen}
          />
          <ResultCard
            icon={<Cloud className="h-6 w-6" />}
            label={t("results.co2.label")}
            value={t("results.co2.grams", { value: result.co2Grams.toFixed(2) })}
            description={t("results.co2.description")}
          />
          <ResultCard
            icon={<Database className="h-6 w-6" />}
            label={t("results.size.label")}
            value={t("results.size.mb", { value: result.sizeMb.toFixed(2) })}
            description={t("results.size.description")}
          />
          <ResultCard
            icon={<Server className="h-6 w-6" />}
            label={t("results.hosting.label")}
            value={result.hostedBy}
            description={t("results.hosting.description")}
          />
        </div>
      )}
    </div>
  )
}

function ResultCard({ 
  icon, 
  label, 
  value, 
  description,
  isSuccess
}: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  description: string,
  isSuccess?: boolean
}) {
  return (
    <div className={`group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/20 ${isSuccess ? 'bg-green-500/5 border-green-500/20' : ''}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground ${isSuccess ? 'bg-green-500/20 text-green-600 group-hover:bg-green-600' : ''}`}>
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className={`text-2xl font-bold text-foreground tracking-tight ${isSuccess ? 'text-green-600' : ''}`}>
            {value}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
