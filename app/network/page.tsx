import { headers } from "next/headers"
import { NetworkInfoCard, type GeoData } from "@/components/network-info-card"
import { Activity } from "lucide-react"

export default async function NetworkPage() {
  const headersList = await headers()
  const headersObj = Object.fromEntries(headersList.entries())

  let ip = headersObj['cf-connecting-ip'] || headersObj['x-forwarded-for']?.split(',')[0] || headersObj['x-real-ip'] || "127.0.0.1"
  ip = ip.trim()

  let geoData: GeoData | null = null
  const isLocal = ip === "127.0.0.1" || ip === "::1" || ip === "localhost"

  // Only use internal data (from request headers)
  if (headersObj['cf-ipcountry']) {
    geoData = {
      status: "success",
      query: ip,
      countryCode: headersObj['cf-ipcountry'],
      country: headersObj['cf-ipcountry'], // Ideally we'd map this to a name, but for now we'll show the code
      city: headersObj['cf-ipcity'] || "Unknown City",
      regionName: headersObj['cf-region-name'] || headersObj['cf-region'] || "Unknown Region",
      isp: headersObj['cf-ipasn'] ? `ASN ${headersObj['cf-ipasn']}` : "Cloudflare Protected Network",
      org: headersObj['cf-ipcontinent'] ? `Continent: ${headersObj['cf-ipcontinent']}` : undefined
    }
  } else if (isLocal) {
    geoData = { status: "fail", query: ip }
  } else {
    // If not local but no geo headers, we just show the IP
    geoData = {
      status: "fail",
      query: ip,
      isp: "Internal Routing"
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

      </header>

      <main className="container mx-auto flex-1 px-4 pb-24">
        <NetworkInfoCard geoData={geoData} />
      </main>
    </div>
  )
}

