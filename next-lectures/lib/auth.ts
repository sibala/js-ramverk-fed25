import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { db } from './db'
import * as schema from '@/db/auth-schema'

/**
 * AUTHENTICATION with Better Auth.
 *
 * In the API course you built this by hand: bcrypt to hash the password, a JWT,
 * an httpOnly cookie, and middleware that checked it. The library does the same things:
 *
 *   you wrote                          Better Auth does
 *   bcrypt.hash / bcrypt.compare  →    hashes and verifies the password
 *   jwt.sign + res.cookie(...)    →    creates a session and sets an httpOnly cookie
 *   your auth middleware          →    auth.api.getSession(), and proxy.ts for routes
 *   users table                   →    user / session / account / verification tables
 *
 * Why a library? Sessions, CSRF, cookie flags, password rules and token rotation are easy
 * to get subtly wrong, and a mistake here is a security bug, not a rendering bug.
 *
 * Everything in this file runs on the SERVER only. It reads BETTER_AUTH_SECRET,
 * which must never be exposed to the browser (so: no NEXT_PUBLIC_ prefix).
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql', // the same MySQL on Aiven as the rest of the app
    schema,
  }),

  // Email + password, like the login you built in Express
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  user: {
    additionalFields: {
      // Our own column, so we can tell customers from admins
      role: {
        type: 'string',
        defaultValue: 'customer',
        input: false, // a user cannot set their own role when signing up!
      },
    },
  },

  // nextCookies() must be LAST: it lets Server Actions set the session cookie
  plugins: [nextCookies()],
})
