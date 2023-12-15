import { NextResponse } from 'next/server'

const locales = ['en', 'de', 'fr']
const defaultLocale = 'en'

function getLocale(request) {
  let localeCookie = request.cookies.get('locale')
  return localeCookie?.value || defaultLocale
}

export function middleware(request) {
  const { href, pathname, search } = request.nextUrl
  const pathnameIsMissingLocale = locales.every(
    (locale) => !href.includes(`/${locale}/`) && !href.endsWith(`/${locale}`)
  )
  // Redirect if there is no locale
  const locale = getLocale(request)
  if (pathnameIsMissingLocale && locale && locale !== defaultLocale) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, request.url))
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico).*)',
    //  run on root (/) URL
    '/',
  ],
}
