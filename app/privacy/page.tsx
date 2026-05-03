import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Headerly",
  description: "Read our privacy policy to understand how we handle your data at Headerly.",
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </header>

      <main className="container mx-auto flex-1 px-4 pb-20 max-w-3xl">
        <div className="space-y-12 text-muted-foreground">
          <section>
            <p className="text-lg leading-relaxed text-foreground/90">
              This website has been developed to enable users to view HTTP header information.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Data Collected</h3>
            <p className="mb-4">
              This site does not actively request or store any personal data from users. 
              However, as part of a website&apos;s operation, the following information may be processed temporarily:
            </p>
            <ul className="list-disc pl-6 space-y-3 my-4 marker:text-primary">
              <li>IP address</li>
              <li>Browser and device information (within the HTTP header)</li>
            </ul>
            <p>
              This information is used only temporarily for the purpose of responding to the request and is not permanently stored by us.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Server Logs</h3>
            <p>
              The hosting provider may keep standard server logs for security and performance purposes. We have no direct control over these records.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Cookies (Cookies)</h3>
            <p>
              This site does not use cookies directly. However, technical cookies may be generated depending on the infrastructure used.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Third-Party Services</h3>
            <p>
              By default, this site does not use third-party analysis or advertising services.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Data Security</h3>
            <p>
              Since no user data is stored, the risk of data breaches is minimal. However, basic security measures are implemented.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Communication</h3>
            <p>
              For questions regarding this policy, you can contact the site owner.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Updates</h3>
            <p>
              This policy may be updated from time to time. The latest version is published on this page.
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
