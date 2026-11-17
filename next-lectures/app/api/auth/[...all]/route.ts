import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

/**
 * All of Better Auth's endpoints in one catch-all Route Handler:
 *   POST /api/auth/sign-up/email
 *   POST /api/auth/sign-in/email
 *   POST /api/auth/sign-out
 *   GET  /api/auth/get-session
 *
 * [...all] is a catch-all segment: it matches every path below /api/auth.
 * This is the same idea as app.use('/api/auth', authRouter) in Express.
 */
export const { GET, POST } = toNextJsHandler(auth)
