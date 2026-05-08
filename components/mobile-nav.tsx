"use client";

import * as React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Activity, LayoutList, MonitorCheck, Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("Navbar");

  // Close menu when a link is clicked
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="h-9 w-9"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <div className="absolute left-0 top-[57px] z-50 w-full border-b border-border bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl hover:bg-muted transition-colors"
            >
              <LayoutList className="h-5 w-5 text-primary" />
              <span>{t("headers")}</span>
            </Link>
            <Link
              href="/network"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl hover:bg-muted transition-colors"
            >
              <Activity className="h-5 w-5 text-primary" />
              <span>{t("network")}</span>
            </Link>
            <Link
              href="/user-agent"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl hover:bg-muted transition-colors"
            >
              <MonitorCheck className="h-5 w-5 text-primary" />
              <span>{t("userAgent")}</span>
            </Link>
            <Link
              href="/green-web"
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl hover:bg-muted transition-colors"
            >
              <Leaf className="h-5 w-5 text-primary" />
              <span>{t("greenWeb")}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
