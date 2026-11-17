/**
 * By default Next tries to render pages at BUILD time (static rendering).
 * This page always throws, which would fail `npm run build`, so we force it to be
 * rendered per request instead. Then the error happens at request time, and error.tsx
 * is what the user sees.
 *
 * Static vs dynamic rendering is a big Next.js topic. For now: a page that depends on
 * the request (cookies, searchParams) or that opts out like this is rendered per request.
 */
export const dynamic = 'force-dynamic'

export default function BrokenPage() {
  // Thrown on the server while rendering → the nearest error.tsx takes over
  throw new Error('The product service exploded 💥')
}
