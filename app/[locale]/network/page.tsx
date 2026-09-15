import { headers } from "next/headers"
import { NetworkInfoCards, type GeoData } from "@/components/network-info-card"
import { ShieldCheck, Zap, Lock, EyeOff } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { generatePageMetadata } from "@/lib/metadata"
import { reviewCopy, reviewDetails, type ReviewLocale } from "@/lib/review-copy"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'Metadata.network', '/network');
}

export default async function NetworkPage({ params }: { params: Promise<{ locale: string }> }) {
  const headersList = await headers()
  const t = await getTranslations("NetworkPage")
  const { locale } = await params
  const copy = reviewCopy[locale as ReviewLocale]
  const details = reviewDetails[locale as ReviewLocale]
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
          {t("title")}
        </h1>
        <p className="max-w-[650px] text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t("description")}
        </p>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-32">
        <section className="mb-24">
          <NetworkInfoCards geoData={geoData} />
        </section>

        <section className="mx-auto mb-24 max-w-6xl rounded-2xl border border-border bg-card p-6">
          <h2 className="text-2xl font-bold text-foreground">{copy.networkInterpret}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy.networkNote}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-3">Bilgi</th><th className="px-3 py-3">Kaynak</th><th className="px-3 py-3">Kesinlik</th></tr></thead>
              <tbody className="divide-y divide-border"><tr><td className="px-3 py-3 font-medium text-foreground">{details.networkIp}</td><td className="px-3 py-3 text-muted-foreground">{details.networkIpSource}</td><td className="px-3 py-3 text-muted-foreground">{details.networkIpCertainty}</td></tr><tr><td className="px-3 py-3 font-medium text-foreground">{details.networkLocation}</td><td className="px-3 py-3 text-muted-foreground">{details.networkLocationSource}</td><td className="px-3 py-3 text-muted-foreground">{details.networkLocationCertainty}</td></tr><tr><td className="px-3 py-3 font-medium text-foreground">{details.networkOrg}</td><td className="px-3 py-3 text-muted-foreground">{details.networkOrgSource}</td><td className="px-3 py-3 text-muted-foreground">{details.networkOrgCertainty}</td></tr></tbody>
            </table>
          </div>
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 mb-6">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h2 className="text-4xl font-bold text-foreground tracking-tight">{t("howItWorks.title")}</h2>
                <p className="text-xl text-primary font-medium">{t("howItWorks.subtitle")}</p>
              </div>

              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  {t.rich("howItWorks.p1", {
                    strong: (chunks) => <strong>{chunks}</strong>
                  })}
                </p>
                <p>
                  {t.rich("howItWorks.p2", {
                    strong: (chunks) => <strong>{chunks}</strong>
                  })}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FeatureItem
                icon={<EyeOff className="h-5 w-5" />}
                title={t("features.noTracking.title")}
                description={t("features.noTracking.description")}
              />
              <FeatureItem
                icon={<Zap className="h-5 w-5" />}
                title={t("features.realTime.title")}
                description={t("features.realTime.description")}
              />
              <FeatureItem
                icon={<Lock className="h-5 w-5" />}
                title={t("features.nonPersistent.title")}
                description={t("features.nonPersistent.description")}
              />
              <FeatureItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title={t("features.security.title")}
                description={t("features.security.description")}
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


