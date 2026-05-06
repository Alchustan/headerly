import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="border-t border-border/50 bg-muted/30 py-8 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Headerly. {t("builtWith")}
        </p>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {t("home")}
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {t("terms")}
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {t("privacy")}
          </Link>
          <Link href="https://github.com/Alchustan/headerly" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {t("github")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
