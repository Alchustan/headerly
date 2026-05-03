import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <header className="container mx-auto flex flex-col items-center gap-4 py-12 text-center md:py-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl text-primary">
          Terms of Use
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-20 max-w-3xl">
        <div className="space-y-12 text-muted-foreground">
          <section>
            <p className="text-lg leading-relaxed text-foreground/90">
              By using this website, you are deemed to have accepted the following terms.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Service Description</h3>
            <p>
              This site offers a free tool for viewing HTTP header information.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Disclaimer of Liability</h3>
            <p className="mb-4">
              The service provided is offered &quot;as is&quot;. Site owner:
            </p>
            <ul className="list-disc pl-6 space-y-3 my-4 marker:text-primary">
              <li>Does not guarantee uninterrupted or error-free service</li>
              <li>We do not assume responsibility for the accuracy or timeliness of the information provided.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Rules of Use</h3>
            <p className="mb-4">
              Users agree:
            </p>
            <ul className="list-disc pl-6 space-y-3 my-4 marker:text-primary">
              <li>Not to misuse the service</li>
              <li>Not to perform actions that would damage the system or cause excessive load</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Limitation of Liability</h3>
            <p>
              The site owner shall not be held liable for any direct or indirect damages that may arise from the use of the service.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Changes</h3>
            <p>
              These terms may be updated without prior notice.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Effective Date</h3>
            <p>
              These terms become effective immediately upon your use of the site.
            </p>
          </section>
        </div>
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
