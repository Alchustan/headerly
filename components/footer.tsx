import Link from "next/link"

export function Footer() {
  return (
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
  )
}
