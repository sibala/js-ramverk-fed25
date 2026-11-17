import { connection } from 'next/server'

/**
 * By default Next tries to prerender pages ahead of time (at build time).
 * This page always throws, which would fail `npm run build`, so we call connection()
 * to make it render per request instead. Then the error happens at request time, and
 * error.tsx is what the user sees.
 *
 * Static vs dynamic rendering is a big Next.js topic. For now: a page that depends on
 * the request (cookies, searchParams) or that awaits connection() is rendered per request.
 */
export default async function BrokenPage() {
  await connection()

  // Thrown on the server while rendering → the nearest error.tsx takes over
  throw new Error('The pun service exploded 💥')
}
