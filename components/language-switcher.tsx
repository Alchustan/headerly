"use client";

import { useLocale } from 'next-intl';
import { routing, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const toggleLanguage = (newLocale: string) => {
    if (newLocale === locale) return;

    // With localePrefix="never", the locale lives in the cookie. A full
    // navigation lets the server resolve the new locale without re-rendering
    // next-themes' inline bootstrap script through React 19.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${encodeURIComponent(newLocale)}; path=/; max-age=31536000; samesite=lax`;
    window.location.assign(pathname);
  };

  const localeLabels: Record<string, string> = {
    en: 'English',
    tr: 'Türkçe',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    hi: 'हिन्दी',
    zh: '中文'
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md transition-colors hover:bg-muted">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[150px] p-1 bg-background/95 backdrop-blur-md border border-border shadow-2xl">
        <div className="grid gap-1">
          {routing.locales.map((l) => (
            <Button
              key={l}
              variant="ghost"
              size="sm"
              className={cn(
                "justify-start font-medium",
                locale === l ? "bg-muted text-primary" : "text-muted-foreground"
              )}
              onClick={() => toggleLanguage(l)}
            >
              <span className="mr-2 uppercase text-[10px] font-bold border border-current px-1 rounded">
                {l}
              </span>
              {localeLabels[l] || l}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
