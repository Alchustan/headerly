import { getTranslations } from "next-intl/server";
import { HelpCircle, EyeOff, Monitor, ShieldCheck, Database, Shield, Puzzle, Ghost, Settings } from "lucide-react";
import { FingerprintDashboard } from "./fingerprint-dashboard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.fingerprint' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale === 'en' ? '' : locale}/fingerprint`,
      languages: {
        'en': '/fingerprint',
        'tr': '/tr/fingerprint',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function FingerprintPage() {
  const t = await getTranslations("FingerprintPage");

  const dashboardTranslations = {
    hashLabel: t("hashLabel"),
    loading: t("loading"),
    uniqueness: {
      title: t("uniqueness.title"),
      description: t("uniqueness.description"),
      low: t("uniqueness.low"),
      medium: t("uniqueness.medium"),
      high: t("uniqueness.high"),
    },
    metrics: {
      screen: { title: t("metrics.screen.title"), description: t("metrics.screen.description"), tooltip: t("metrics.screen.tooltip") },
      timezone: { title: t("metrics.timezone.title"), description: t("metrics.timezone.description"), tooltip: t("metrics.timezone.tooltip") },
      hardware: { title: t("metrics.hardware.title"), description: t("metrics.hardware.description"), tooltip: t("metrics.hardware.tooltip") },
      platform: { title: t("metrics.platform.title"), description: t("metrics.platform.description"), tooltip: t("metrics.platform.tooltip") },
      language: { title: t("metrics.language.title"), description: t("metrics.language.description"), tooltip: t("metrics.language.tooltip") },
      cookies: { title: t("metrics.cookies.title"), description: t("metrics.cookies.description"), tooltip: t("metrics.cookies.tooltip") },
      dnt: { title: t("metrics.dnt.title"), description: t("metrics.dnt.description"), tooltip: t("metrics.dnt.tooltip") },
      touch: { title: t("metrics.touch.title"), description: t("metrics.touch.description"), tooltip: t("metrics.touch.tooltip") },
      pixelRatio: { title: t("metrics.pixelRatio.title"), description: t("metrics.pixelRatio.description"), tooltip: t("metrics.pixelRatio.tooltip") },
      canvas: { title: t("metrics.canvas.title"), description: t("metrics.canvas.description"), tooltip: t("metrics.canvas.tooltip") },
      webgl: { title: t("metrics.webgl.title"), description: t("metrics.webgl.description"), tooltip: t("metrics.webgl.tooltip") },
    }
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
      <header className="container mx-auto flex flex-col items-center gap-4 py-16 text-center px-4 md:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
          {t("title")}
        </h1>
        <p className="max-w-[650px] text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t("subtitle")}
        </p>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-32">
        <section className="mb-32 max-w-6xl mx-auto">
          <FingerprintDashboard translations={dashboardTranslations} />
        </section>

        <section className="mt-32 max-w-6xl mx-auto">
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
                <p>{t("howItWorks.p1")}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ExplanationItem
                icon={<EyeOff className="h-5 w-5" />}
                title={t("features.cookieless.title")}
                description={t("features.cookieless.description")}
              />
              <ExplanationItem
                icon={<Monitor className="h-5 w-5" />}
                title={t("features.canvasRender.title")}
                description={t("features.canvasRender.description")}
              />
              <ExplanationItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title={t("features.privacy.title")}
                description={t("features.privacy.description")}
              />
              <ExplanationItem
                icon={<Database className="h-5 w-5" />}
                title={t("features.stateless.title")}
                description={t("features.stateless.description")}
              />
            </div>
          </div>
        </section>

        <section className="mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground tracking-tight">{t("actionableSteps.title")}</h2>
            <p className="mt-4 text-xl text-muted-foreground">{t("actionableSteps.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ActionableStepCard
              icon={<Shield className="h-6 w-6" />}
              title={t("actionableSteps.steps.browsers.title")}
              description={t("actionableSteps.steps.browsers.description")}
            />
            <ActionableStepCard
              icon={<Puzzle className="h-6 w-6" />}
              title={t("actionableSteps.steps.extensions.title")}
              description={t("actionableSteps.steps.extensions.description")}
            />
            <ActionableStepCard
              icon={<Ghost className="h-6 w-6" />}
              title={t("actionableSteps.steps.incognito.title")}
              description={t("actionableSteps.steps.incognito.description")}
            />
            <ActionableStepCard
              icon={<Settings className="h-6 w-6" />}
              title={t("actionableSteps.steps.settings.title")}
              description={t("actionableSteps.steps.settings.description")}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function ActionableStepCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-card/50 hover:bg-card hover:shadow-lg transition-all group">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-foreground text-lg mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ExplanationItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-[2rem] border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
