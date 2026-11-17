'use client'

import { createAuthClient } from 'better-auth/react'

/**
 * The CLIENT side of Better Auth: signUp, signIn, signOut and useSession,
 * for use in Client Components. It talks to /api/auth/* over HTTP.
 *
 * Note what is NOT here: no secret, no database. Only the public API.
 */
export const authClient = createAuthClient()

export const { signIn, signUp, signOut, useSession } = authClient
