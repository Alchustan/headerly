import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(tr|en|de|es|fr|hi|zh)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
