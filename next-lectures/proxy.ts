import { NextResponse, type NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

/**
 * proxy.ts runs BEFORE the matching routes below. In Next.js 15 this file was called
 * middleware.ts: same idea, new name (and it always runs on the Node runtime now).
 *
 * This is your Express middleware:
 *   app.use('/dashboard', requireAuth)   →   the matcher below
 *
 * IMPORTANT: this is an "optimistic" check. It only looks for the session COOKIE, it
 * does not validate it against the database (that would mean a query on every request).
 * So treat it as a redirect for convenience, not as your security boundary.
 * The real check belongs in the page, the Server Action and the Route Handler.
 */
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)

  if (!sessionCookie) {
    const signInUrl = new URL('/5-auth/sign-in', request.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

// Only these routes go through the proxy
export const config = {
  matcher: ['/5-auth/dashboard/:path*'],
}
