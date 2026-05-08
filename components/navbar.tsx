import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MobileNav } from "@/components/mobile-nav"
import { Activity, LayoutList, MonitorCheck, Leaf } from "lucide-react"

export function Navbar() {
  const t = useTranslations("Navbar")

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold sm:inline-block text-primary">
              {t("brand")}
            </span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <LayoutList className="h-4 w-4" />
              <span>{t("headers")}</span>
            </Link>
            <Link
              href="/network"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Activity className="h-4 w-4" />
              <span>{t("network")}</span>
            </Link>
            <Link
              href="/user-agent"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <MonitorCheck className="h-4 w-4" />
              <span>{t("userAgent")}</span>
            </Link>
            <Link
              href="/green-web"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Leaf className="h-4 w-4" />
              <span>{t("greenWeb")}</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}
