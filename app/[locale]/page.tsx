import { Globe, Lock, Code2, TreePine, Share2, ExternalLink } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function Page() {
  const t = await getTranslations("HomePage")

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <header className="container mx-auto flex flex-col items-center gap-6 py-12 text-center md:py-24 px-4">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary lg:text-7xl text-balance">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/headers">
            <Button size="lg" className="rounded-xl">
              {t("hero.cta")}
            </Button>
          </Link>
          <Link href="https://github.com/Alchustan/headerly" target="_blank">
            <Button variant="outline" size="lg" className="rounded-xl gap-2">
              <ExternalLink className="h-5 w-5" />
              {t("hero.github")}
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24">
        {/* Digital Identity Section */}
        <section className="border-b border-border py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("sections.digitalIdentity.title")}
              </h2>
            </div>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-3xl">
              {t("sections.digitalIdentity.description")}
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  { icon: <Code2 className="h-5 w-5" />, title: t("sections.digitalIdentity.features.headers.title"), desc: t("sections.digitalIdentity.features.headers.description") },
                  { icon: <Share2 className="h-5 w-5" />, title: t("sections.digitalIdentity.features.network.title"), desc: t("sections.digitalIdentity.features.network.description") },
                  { icon: <Lock className="h-5 w-5" />, title: t("sections.digitalIdentity.features.useragent.title"), desc: t("sections.digitalIdentity.features.useragent.description") }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-base text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-primary/5 rounded-2xl p-8 flex items-center justify-center min-h-80">
                <div className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                    <Globe className="h-8 w-8" />
                  </div>
                  <p className="text-muted-foreground text-sm">Digital fingerprint visualization</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="border-b border-border py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("sections.privacy.title")}
              </h2>
            </div>
            <p className="text-base text-muted-foreground mb-12 leading-relaxed max-w-3xl">
              {t("sections.privacy.description")}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Lock className="h-5 w-5" />, title: t("sections.privacy.features.noStorage.title"), desc: t("sections.privacy.features.noStorage.description") },
                { icon: <Globe className="h-5 w-5" />, title: t("sections.privacy.features.serverSide.title"), desc: t("sections.privacy.features.serverSide.description") },
                { icon: <Code2 className="h-5 w-5" />, title: t("sections.privacy.features.transparent.title"), desc: t("sections.privacy.features.transparent.description") }
              ].map((item, idx) => (
                <div key={idx} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors hover:-translate-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Environmental Impact Section */}
        <section className="border-b border-border py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TreePine className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("sections.environmental.title")}
              </h2>
            </div>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-3xl">
              {t("sections.environmental.description")}
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-emerald-100/50 dark:bg-emerald-950/20 rounded-2xl p-8 flex items-center justify-center min-h-80">
                <div className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-4">
                    <TreePine className="h-8 w-8" />
                  </div>
                  <p className="text-muted-foreground text-sm">Green energy impact</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <TreePine className="h-5 w-5" />, title: t("sections.environmental.features.greenWeb.title"), desc: t("sections.environmental.features.greenWeb.description") },
                  { icon: <Globe className="h-5 w-5" />, title: t("sections.environmental.features.impact.title"), desc: t("sections.environmental.features.impact.description") },
                  { icon: <Code2 className="h-5 w-5" />, title: t("sections.environmental.features.performance.title"), desc: t("sections.environmental.features.performance.description") }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-base text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Network Transparency Section */}
        <section className="border-b border-border py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Share2 className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("sections.network.title")}
              </h2>
            </div>
            <p className="text-base text-muted-foreground mb-12 leading-relaxed max-w-3xl">
              {t("sections.network.description")}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Globe className="h-5 w-5" />, title: t("sections.network.features.location.title"), desc: t("sections.network.features.location.description") },
                { icon: <Code2 className="h-5 w-5" />, title: t("sections.network.features.metadata.title"), desc: t("sections.network.features.metadata.description") },
                { icon: <Lock className="h-5 w-5" />, title: t("sections.network.features.security.title"), desc: t("sections.network.features.security.description") }
              ].map((item, idx) => (
                <div key={idx} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors hover:-translate-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Source Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Code2 className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("sections.openSource.title")}
              </h2>
            </div>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed max-w-3xl">
              {t("sections.openSource.description")}
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  { icon: <Code2 className="h-5 w-5" />, title: t("sections.openSource.features.transparent.title"), desc: t("sections.openSource.features.transparent.description") },
                  { icon: <ExternalLink className="h-5 w-5" />, title: t("sections.openSource.features.contribute.title"), desc: t("sections.openSource.features.contribute.description") },
                  { icon: <Globe className="h-5 w-5" />, title: t("sections.openSource.features.community.title"), desc: t("sections.openSource.features.community.description") }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-base text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-primary/5 rounded-2xl p-8 flex items-center justify-center min-h-80">
                <div className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                    <Code2 className="h-8 w-8" />
                  </div>
                  <p className="text-muted-foreground text-sm">Open source community</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
