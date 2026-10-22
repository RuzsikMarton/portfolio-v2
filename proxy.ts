import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)',
};
