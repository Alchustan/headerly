import { headers } from "next/headers"
import { UAParserComponent } from "@/components/ua-parser"
import { ShieldCheck, Zap, HelpCircle, Code2, Cpu } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function UserAgentPage() {
  const headersList = await headers()
  const t = await getTranslations("UserAgentPage")
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

            <div className="grid sm:grid-cols-2 gap-4">
              <ExplanationItem
                icon={<Code2 className="h-5 w-5" />}
                title={t("features.matching.title")}
                description={t("features.matching.description")}
              />
              <ExplanationItem
                icon={<Cpu className="h-5 w-5" />}
                title={t("features.engine.title")}
                description={t("features.engine.description")}
              />
              <ExplanationItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title={t("features.privacy.title")}
                description={t("features.privacy.description")}
              />
              <ExplanationItem
                icon={<Zap className="h-5 w-5" />}
                title={t("features.realTime.title")}
                description={t("features.realTime.description")}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function ExplanationItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
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
