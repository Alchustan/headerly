import { headers } from "next/headers"
import { HeaderCard } from "@/components/header-card"
import { Terminal, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default async function Page() {
  const headersList = await headers()

  // Convert headers to a plain object
  const headersObj: Record<string, string> = {}
  headersList.forEach((value, key) => {
    headersObj[key] = value
  })

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <header className="container mx-auto flex flex-col items-center gap-2 py-12 text-center md:py-20">
        <h1 className="mt-4 text-4xl font-extrabold tracking-widest sm:text-5xl md:text-6xl text-primary">
          Headerly
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Instantly view and inspect your HTTP request headers in a clean, developer-friendly interface.
        </p>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-20">
        <HeaderCard headers={headersObj} />

        <section className="mt-20 grid gap-8 sm:grid-cols-3 max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-card-foreground">Privacy First</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Headers are processed server-side and never stored. What you see is only visible to you.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-card-foreground">Developer Tools</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built for developers. Copy individual values or the entire JSON payload with a single click.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-card-foreground">Open Source</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Headerly is built with modern tools: Next.js, Tailwind, and Radix UI.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 bg-muted/30 py-8 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Headerly. Built for the modern web.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="https://github.com/Alchustan/headerly" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Code2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  )
}
