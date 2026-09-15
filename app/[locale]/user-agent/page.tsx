import { headers } from "next/headers"
import { UAParserComponent } from "@/components/ua-parser"
import { HelpCircle } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import { generatePageMetadata } from "@/lib/metadata"
import { reviewCopy, type ReviewLocale } from "@/lib/review-copy"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'Metadata.userAgent', '/user-agent');
}
export default async function UserAgentPage() {
  const headersList = await headers()
  const t = await getTranslations("UserAgentPage")
  const locale = await getLocale()
  const copy = reviewCopy[locale as ReviewLocale]
  const headersObj = Object.fromEntries(headersList.entries())
  const userAgent = headersObj["user-agent"] || ""

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
        <section className="mb-32">
          <UAParserComponent userAgent={userAgent} />
        </section>

        <section className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
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
                    code: (chunks) => <code>{chunks}</code>
                  })}
                </p>
                <ul className="list-disc pl-6 space-y-4">
                  <li>{t.rich("howItWorks.list.engine", { strong: (chunks) => <strong>{chunks}</strong> })}</li>
                  <li>{t.rich("howItWorks.list.os", { strong: (chunks) => <strong>{chunks}</strong> })}</li>
                  <li>{t.rich("howItWorks.list.device", { strong: (chunks) => <strong>{chunks}</strong> })}</li>
                </ul>
                <p>
                  {t("howItWorks.p2")}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{copy.uaSent}</p>
              <pre className="whitespace-pre-wrap break-all rounded-xl bg-muted/60 p-4 font-mono text-sm leading-relaxed text-foreground">{userAgent}</pre>
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Mozilla/5.0</strong> {copy.uaMozilla}</p>
                <p><strong className="text-foreground">Chrome/...</strong> {copy.uaChrome}</p>
                <p><strong className="text-foreground">Windows NT ...</strong> {copy.uaPlatform}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
