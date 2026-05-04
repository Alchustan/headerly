import { headers } from "next/headers"
import { NetworkInfoCards, type GeoData } from "@/components/network-info-card"
import { Activity, ShieldCheck, Zap, Lock, EyeOff, Globe } from "lucide-react"

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
      country: headersObj['cf-ipcountry'],
      city: headersObj['cf-ipcity'] || "Unknown City",
      regionName: headersObj['cf-region-name'] || headersObj['cf-region'] || "Unknown Region",
      isp: headersObj['cf-ipasn'] ? `ASN ${headersObj['cf-ipasn']}` : "Cloudflare Protected Network",
      org: headersObj['cf-ipcontinent'] ? `Continent: ${headersObj['cf-ipcontinent']}` : undefined
    }
  } else if (isLocal) {
    geoData = { status: "fail", query: ip }
  } else {
    geoData = {
      status: "fail",
      query: ip,
      isp: "Internal Routing"
    }
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
      <header className="container mx-auto flex flex-col items-center gap-4 py-16 text-center px-4 md:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
          Network Details
        </h1>
        <p className="max-w-[650px] text-muted-foreground text-lg md:text-xl leading-relaxed">
          Explore the technical blueprint of your current connection, derived solely from request metadata.
        </p>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-32">
        <section className="mb-24">
          <NetworkInfoCards geoData={geoData} />
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 mb-6">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h2 className="text-4xl font-bold text-foreground tracking-tight">How is this data provided?</h2>
                <p className="text-xl text-primary font-medium">Privacy-first, transparent, and secure.</p>
              </div>

              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  At Headerly, your privacy is our top priority. We <strong>do not rely on third-party geolocation APIs</strong> or share your usage data.
                </p>
                <p>
                  All the network and location details displayed above are extracted solely from the <strong>HTTP request metadata</strong> sent by your browser. We use secure edge computing headers (Cloudflare Edge) to determine your approximate origin in real-time.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FeatureItem
                icon={<EyeOff className="h-5 w-5" />}
                title="Zero Third-Party Tracking"
                description="No external APIs ever see your IP address."
              />
              <FeatureItem
                icon={<Zap className="h-5 w-5" />}
                title="Real-Time Processing"
                description="Data is analyzed on-the-fly at the network edge."
              />
              <FeatureItem
                icon={<Lock className="h-5 w-5" />}
                title="Non-Persistent Data"
                description="We never store your connection details."
              />
              <FeatureItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Edge-to-Edge Security"
                description="Encrypted delivery of your network profile."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-[2rem] border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}


