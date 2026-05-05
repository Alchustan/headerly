import { headers } from "next/headers"
import { UAParserComponent } from "@/components/ua-parser"
import { Info, ShieldCheck, Zap, HelpCircle, Code2, Cpu } from "lucide-react"

export default async function UserAgentPage() {
  const headersList = await headers()
  const headersObj = Object.fromEntries(headersList.entries())
  const userAgent = headersObj["user-agent"] || ""

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background">
      <header className="container mx-auto flex flex-col items-center gap-4 py-16 text-center px-4 md:py-24">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary">
          User-Agent Analysis
        </h1>
        <p className="max-w-[650px] text-muted-foreground text-lg md:text-xl leading-relaxed">
          Deep dive into your browser's digital fingerprint and understand how identification works.
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
                <h2 className="text-4xl font-bold text-foreground tracking-tight">How is this detected?</h2>
                <p className="text-xl text-primary font-medium">Decoding the browser's identity string.</p>
              </div>

              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Every time you visit a website, your browser sends a <code>User-Agent</code> header. This string acts as a "passport" that tells the server:
                </p>
                <ul className="list-disc pl-6 space-y-4">
                  <li><strong>Browser Engine:</strong> The underlying technology (like Blink for Chrome/Edge or Gecko for Firefox).</li>
                  <li><strong>OS Details:</strong> The operating system and version you are running.</li>
                  <li><strong>Device Info:</strong> Whether you are on a phone, tablet, or desktop, and sometimes the specific model.</li>
                </ul>
                <p>
                  We use an advanced parsing library to break down this complex string into human-readable components. This process is done <strong>entirely on the server</strong> and the result is only used to display this dashboard.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ExplanationItem
                icon={<Code2 className="h-5 w-5" />}
                title="Pattern Matching"
                description="We scan the string for specific keywords and version numbers used by vendors."
              />
              <ExplanationItem
                icon={<Cpu className="h-5 w-5" />}
                title="Engine Inference"
                description="Identifying the core rendering engine based on standard naming conventions."
              />
              <ExplanationItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Privacy Protected"
                description="Your ID string is processed in real-time and never saved or tracked."
              />
              <ExplanationItem
                icon={<Zap className="h-5 w-5" />}
                title="Real-Time Analysis"
                description="Parsing happens in milliseconds during the request lifecycle."
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
