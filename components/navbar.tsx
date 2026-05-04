import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Activity, LayoutList } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold sm:inline-block text-primary">
              Headerly
            </span>
          </Link>
          <div className="flex gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <LayoutList className="h-4 w-4" />
              <span>Headers</span>
            </Link>
            <Link
              href="/network"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Activity className="h-4 w-4" />
              <span>Network Info</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
