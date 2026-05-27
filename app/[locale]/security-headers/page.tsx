import { getTranslations } from "next-intl/server"
import { SecurityAnalyzer } from "@/components/security-analyzer"
import { HelpCircle, Shield, EyeOff, Server, FileCheck } from "lucide-react"
import { generatePageMetadata } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata(locale, 'Metadata.securityHeaders', '/security-headers');
}

export default async function SecurityHeadersPage() {
  const t = await getTranslations("SecurityHeadersPage")

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

            <div className="grid sm:grid-cols-2 gap-4">
              <FeatureItem
                icon={<Shield className="h-5 w-5" />}
                title={t("features.protection.title")}
                description={t("features.protection.description")}
              />
              <FeatureItem
                icon={<FileCheck className="h-5 w-5" />}
                title={t("features.scoring.title")}
                description={t("features.scoring.description")}
              />
              <FeatureItem
                icon={<EyeOff className="h-5 w-5" />}
                title={t("features.privacy.title")}
                description={t("features.privacy.description")}
              />
              <FeatureItem
                icon={<Server className="h-5 w-5" />}
                title={t("features.realtime.title")}
                description={t("features.realtime.description")}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
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
