import createIntlMiddleware from 'next-intl/middleware'
import {locales, localePrefix} from './navigation'
import {withAuth} from 'next-auth/middleware'
import {NextRequest} from 'next/server'

const publicPages = [
  '/login',
  '/signup',
  '/',
  // (/secret requires auth)
]

const intlMiddleware = createIntlMiddleware({
  // A list of all locales that are supported
  defaultLocale: 'en',
  localePrefix,
  locales,
  // Used when no locale matches
})

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  // * onSuccess
  req => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({token}) => {
        return token != null
      },
    },
    // pages: {
    //   signIn: '/login',
    // },
  },
)

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
