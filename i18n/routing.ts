import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'tr', 'de', 'es', 'fr', 'hi', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en',
  // Locales share the same route paths. The active locale is selected via the
  // NEXT_LOCALE cookie (and falls back to English) instead of URL prefixes.
  localePrefix: 'never'
});

// Lightweight wrappers around Next.js navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
