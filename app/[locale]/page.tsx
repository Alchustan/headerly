import { headers } from "next/headers"
import { HeaderCard } from "@/components/header-card"
import { Terminal, Globe, Code2 } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function Page() {
  const headersList = await headers()
  const t = await getTranslations("HomePage")

  // Convert headers to a plain object
  const headersObj = Object.fromEntries(headersList.entries())

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
      <header className="container mx-auto flex flex-col items-center gap-4 py-12 text-center md:py-20 px-4">

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary lg:text-7xl">
          {t("title")}
        </h1>
        <p className="max-w-[650px] text-muted-foreground text-lg md:text-xl leading-relaxed">
          {t("description")}
        </p>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-24">
        <HeaderCard headers={headersObj} />

        <section className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<Globe className="h-5 w-5" />}
            title={t("features.privacy.title")}
            description={t("features.privacy.description")}
          />
          <FeatureCard 
            icon={<Code2 className="h-5 w-5" />}
            title={t("features.devTools.title")}
            description={t("features.devTools.description")}
          />
          <FeatureCard 
            icon={<Terminal className="h-5 w-5" />}
            title={t("features.openSource.title")}
            description={t("features.openSource.description")}
          />
        </section>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

