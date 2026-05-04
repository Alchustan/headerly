import { headers } from "next/headers"
import { NetworkInfoCard, type GeoData } from "@/components/network-info-card"
import { Activity } from "lucide-react"

export default async function NetworkPage() {
  const headersList = await headers()

  // Convert headers to a plain object
  const headersObj: Record<string, string> = {}
  headersList.forEach((value, key) => {
    headersObj[key] = value
  })

  let ip = headersObj['cf-connecting-ip'] || headersObj['x-forwarded-for']?.split(',')[0] || headersObj['x-real-ip'] || "127.0.0.1"
  ip = ip.trim()

  let geoData: GeoData | null = null
  if (ip !== "127.0.0.1" && ip !== "::1" && ip !== "localhost") {
    try {
      const res = await fetch(`http://ip-api.com/json/${ip}`, { cache: 'no-store' })
      if (res.ok) {
        geoData = await res.json()
      }
    } catch (e) {
      console.error("Failed to fetch geo data", e)
    }
  } else {
    geoData = { status: "fail", query: ip }
  }

  // Fallback to Cloudflare headers if available
  if (headersObj['cf-ipcountry'] && (!geoData || geoData.status === 'fail' || !geoData.country)) {
    geoData = {
      status: "success",
      query: ip,
      countryCode: headersObj['cf-ipcountry'],
      country: headersObj['cf-ipcountry'],
      city: headersObj['cf-ipcity'] || "Unknown Location",
      isp: "Cloudflare Network"
    }
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
      <header className="container mx-auto flex flex-col items-center gap-2 py-12 text-center md:py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
          <Activity className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-widest sm:text-5xl text-primary">
          Network Details
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Detailed IP and geolocation analysis of your connection.
        </p>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-20">
        <NetworkInfoCard geoData={geoData} />
      </main>
    </div>
  )
}
