import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from './auth'

/**
 * Helpers for reading the session on the SERVER.
 *
 * headers() is async in Next.js 16, and reading it makes the page dynamic:
 * a page that depends on who is logged in can't be prerendered at build time.
 */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

/**
 * Use at the top of any page or Server Action that requires a login.
 * It returns the session, or redirects. TypeScript then knows the user exists.
 *
 * This is your `requireAuth` middleware from Express, as a function you call.
 */
export async function requireUser() {
  const session = await getSession()

  if (!session) {
    redirect('/5-auth/sign-in')
  }

  return session.user
}

// Role check on top of the login check
export async function requireAdmin() {
  const user = await requireUser()

  if (user.role !== 'admin') {
    redirect('/5-auth?error=admin-only')
  }

  return user
}
