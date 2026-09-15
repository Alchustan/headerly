import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Locales are resolved independently of the pathname, so every application
  // route must pass through next-intl while APIs and static assets are skipped.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
