import { Lock, Code2, TreePine, Share2, ExternalLink, ArrowRight } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { reviewCopy, reviewDetails, type ReviewLocale } from "@/lib/review-copy"
import { SmoothScrollLink } from "@/components/smooth-scroll-link"

const tools = [
  { key: "headers", href: "/headers", icon: Code2 },
  { key: "network", href: "/network", icon: Share2 },
  { key: "useragent", href: "/user-agent", icon: Lock },
  { key: "greenWeb", href: "/green-web", icon: TreePine },
  { key: "security", href: "/security-headers", icon: ShieldIcon },
]

function ShieldIcon(props: React.ComponentProps<typeof Lock>) {
  return <Lock {...props} />
}

export default async function Page() {
  const t = await getTranslations("HomePage")
  const securityT = await getTranslations("SecurityHeadersPage")
  const locale = await getLocale()
  const isTurkish = locale === "tr"
  const copy = reviewCopy[locale as ReviewLocale]
  const details = reviewDetails[locale as ReviewLocale]

  return (
    <div className="relative flex flex-1 flex-col bg-background">
      <header className="container mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1fr_0.9fr] md:items-center md:py-32">
        <div className="space-y-7">
          <div className="space-y-4">
            <p className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">{copy.homeEyebrow}</p>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
              {t("hero.title")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t("hero.subtitle")}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/headers"><Button size="lg" className="rounded-xl gap-2">{t("hero.cta")}<ArrowRight className="h-4 w-4" /></Button></Link>
            <SmoothScrollLink href="#tools"><Button variant="outline" size="lg" className="rounded-xl">{copy.homeExplore}</Button></SmoothScrollLink>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <span className="text-sm font-semibold text-foreground">{copy.homeExample}</span>
            <span className="font-mono text-xs text-muted-foreground">GET /</span>
          </div>
          <div className="space-y-3 font-mono text-sm">
            {(isTurkish ? [["user-agent", "Chrome / Windows"], ["accept-language", "tr"], ["sec-fetch-site", "none"], ["referer", "—"]] : [["user-agent", "Chrome / Windows"], ["accept-language", "en"], ["sec-fetch-site", "none"], ["referer", "—"]]).map(([name, value]) => (
              <div key={name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 rounded-lg bg-muted/60 px-3 py-2">
                <span className="break-all text-primary">{name}</span><span className="break-all text-foreground">{value}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.homeExampleNote}</p>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <section id="tools" className="scroll-mt-20 border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-10 max-w-2xl">
              <><p className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary">{copy.homeStart ?? copy.homeExplore}</p><h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{copy.homeStartTitle ?? copy.homeBoundaries}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{copy.homeStartText ?? copy.homeExampleNote}</p></>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {tools.map(({ key, href, icon: Icon }) => {
                const section = key === "headers" || key === "network" || key === "useragent" ? "digitalIdentity" : key === "greenWeb" ? "environmental" : "security"
                const itemKey = key === "security" ? "security" : key
                return <Link key={key} href={href} className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
                  <Icon className="mb-5 h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground">{key === "security" ? securityT("title") : t(`sections.${section}.features.${itemKey}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{key === "security" ? securityT("description") : t(`sections.${section}.features.${itemKey}.description`)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">{copy.inspect ?? copy.homeExplore} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              })}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Lock className="mb-5 h-7 w-7 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground">{copy.homeBoundaries}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{details.homeBoundaryText}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground">{details.homeHow}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>• İstek başlıkları mevcut bağlantı üzerinden okunur.</li>
                <li>• Seçtiğiniz header için açıklama ve kaynak gösterilir.</li>
                <li>• URL analizleri hedef siteye sunucu tarafından istek gönderir.</li>
                <li>• Hosting sağlayıcısının erişim logları Headerly’nin kontrolünde değildir.</li>
              </ul>
              <Link href="/privacy" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">{details.homePrivacy} <ExternalLink className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
