import createMiddleware from 'next-intl/middleware'
import {locales, localePrefix} from './navigation'

export default createMiddleware({
  // A list of all locales that are supported
  defaultLocale: 'en',
  localePrefix,
  locales,
  // Used when no locale matches
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*'],
}
