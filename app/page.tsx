import { headers } from "next/headers"
import { HeaderCard } from "@/components/header-card"
import { Terminal, Globe, Code2 } from "lucide-react"

export default async function Page() {
  const headersList = await headers()

  // Convert headers to a plain object
  const headersObj = Object.fromEntries(headersList.entries())

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
      <header className="container mx-auto flex flex-col items-center gap-4 py-12 text-center md:py-20 px-4">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-2">
          HTTP Inspector
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary lg:text-7xl">
          Headerly
        </h1>
        <p className="max-w-[650px] text-muted-foreground text-lg md:text-xl leading-relaxed">
          Instantly view and inspect your HTTP request headers in a clean, developer-friendly interface.
        </p>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-24">
        <HeaderCard headers={headersObj} />

        <section className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<Globe className="h-5 w-5" />}
            title="Privacy First"
            description="Headers are processed server-side and never stored. What you see is only visible to you and stays within your session."
          />
          <FeatureCard 
            icon={<Code2 className="h-5 w-5" />}
            title="Developer Tools"
            description="Built for developers. Copy individual values or the entire JSON payload with a single click. High performance and easy to use."
          />
          <FeatureCard 
            icon={<Terminal className="h-5 w-5" />}
            title="Open Source"
            description="Headerly is open-source and MIT licensed. Explore the code on GitHub, report issues, or contribute to make it better."
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

