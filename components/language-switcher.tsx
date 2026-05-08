"use client";

import { useLocale } from 'next-intl';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const toggleLanguage = (newLocale: string) => {
    // @ts-ignore
    router.replace(pathname, { locale: newLocale });
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
