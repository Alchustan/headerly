import { getTranslations } from "next-intl/server"
import { SecurityAnalyzer } from "@/components/security-analyzer"
import { HelpCircle } from "lucide-react"
import { generatePageMetadata } from "@/lib/metadata"
import { reviewCopy, reviewDetails, type ReviewLocale } from "@/lib/review-copy"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'Metadata.securityHeaders', '/security-headers');
}
export default async function SecurityHeadersPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("SecurityHeadersPage")
  const { locale } = await params
  const copy = reviewCopy[locale as ReviewLocale]
  const details = reviewDetails[locale as ReviewLocale]

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
          <SecurityAnalyzer />
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 mb-6">
                  <HelpCircle className="h-7 w-7" />
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

            <ol className="space-y-4">
              <li className="rounded-2xl border border-border bg-card p-5"><span className="font-mono text-sm text-primary">01</span><h3 className="mt-2 font-bold text-foreground">{copy.secStep1}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{details.sec1Desc}</p></li>
              <li className="rounded-2xl border border-border bg-card p-5"><span className="font-mono text-sm text-primary">02</span><h3 className="mt-2 font-bold text-foreground">{copy.secStep2}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{details.sec2Desc}</p></li>
              <li className="rounded-2xl border border-border bg-card p-5"><span className="font-mono text-sm text-primary">03</span><h3 className="mt-2 font-bold text-foreground">{copy.secStep3}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{details.sec3Desc}</p></li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  )
}
