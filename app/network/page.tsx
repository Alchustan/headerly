import { headers } from "next/headers"
import { NetworkInfoCard, type GeoData } from "@/components/network-info-card"
import { Activity, ShieldCheck } from "lucide-react"

export default async function NetworkPage() {
  const headersList = await headers()
  const headersObj = Object.fromEntries(headersList.entries())

  let ip = headersObj['cf-connecting-ip'] || headersObj['x-forwarded-for']?.split(',')[0] || headersObj['x-real-ip'] || "127.0.0.1"
  ip = ip.trim()

  let geoData: GeoData | null = null
  const isLocal = ip === "127.0.0.1" || ip === "::1" || ip === "localhost"

  if (!isLocal) {
    try {
      // Using a more reliable way to fetch with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const res = await fetch(`http://ip-api.com/json/${ip}`, { 
        cache: 'no-store',
        signal: controller.signal 
      })
      
      clearTimeout(timeoutId)
      
      if (res.ok) {
        geoData = await res.json()
      }
    } catch (e) {
      console.error("Failed to fetch geo data:", e)
    }
  }

  // Fallback to Cloudflare headers if geoData is missing or failed
  if (!geoData || geoData.status === 'fail') {
    if (headersObj['cf-ipcountry']) {
      geoData = {
        status: "success",
        query: ip,
        countryCode: headersObj['cf-ipcountry'],
        country: headersObj['cf-ipcountry'],
        city: headersObj['cf-ipcity'] || "Unknown City",
        isp: "Cloudflare Network"
      }
    } else if (isLocal) {
      geoData = { status: "fail", query: ip }
    }
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
      <header className="container mx-auto flex flex-col items-center gap-4 py-12 text-center md:py-16 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2 shadow-sm ring-1 ring-primary/20">
          <Activity className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-primary">
          Network Details
        </h1>
        <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
          Detailed IP and geolocation analysis of your current connection.
        </p>
        <div className="flex items-center gap-2 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
          <ShieldCheck className="h-3 w-3" />
          Securely processed
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-24">
        <NetworkInfoCard geoData={geoData} />
      </main>
    </div>
  )
}

