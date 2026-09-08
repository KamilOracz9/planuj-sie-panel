import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/lib/i18n/routing';
import { ACCESS_TOKEN_COOKIE } from '@/features/auth/constants';
import { Pathnames } from '@/features/routing';

const intlMiddleware = createMiddleware(routing);

const SIGN_IN_PATHNAME = Pathnames.SIGN_IN;
const localePrefixPattern = new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`);

function withoutLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(localePrefixPattern, '');
  return stripped === '' ? '/' : stripped;
}

function localePrefixOf(pathname: string): string {
  return pathname.match(localePrefixPattern)?.[0] ?? '';
}

export default async function middleware(request: NextRequest) {
  request.headers.set("x-current-path", request.nextUrl.pathname);

  // Optimistic auth check (presence of the token cookie only - the API is
  // the source of truth on whether it's still valid). See the panel-jwt
  // plan / Next.js's "Optimistic checks with Proxy" guide.
  const pathname = withoutLocalePrefix(request.nextUrl.pathname);
  const localePrefix = localePrefixOf(request.nextUrl.pathname);
  const hasToken = request.cookies.has(ACCESS_TOKEN_COOKIE);
  const isSignInRoute = pathname === SIGN_IN_PATHNAME;

  if (!hasToken && !isSignInRoute) {
    return NextResponse.redirect(new URL(`${localePrefix}${SIGN_IN_PATHNAME}`, request.url));
  }

  if (hasToken && isSignInRoute) {
    return NextResponse.redirect(new URL(localePrefix || '/', request.url));
  }

  // Continue with normal intl middleware for other routes
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};