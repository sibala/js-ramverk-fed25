import { connection } from 'next/server'

/**
 * Without connection(), Next would prerender this page ahead of time (the 2 second wait
 * would happen there), and users would get instant HTML with no loading state at all.
 * connection() tells Next to wait for a real request, so we can see loading.tsx do its job.
 */

// A Server Component can be async and await things (a database, an API, a slow function)
export default async function SlowPage() {
  await connection() // everything below runs per request
  await new Promise((resolve) => setTimeout(resolve, 2000)) // pretend the database is slow

  return (
    <>
      <h1 className="text-2xl font-bold">Finally!</h1>
      <p className="mt-2 text-slate-600">
        This page waited 2 seconds before rendering. While it waited, Next showed <code>loading.tsx</code>.
      </p>
    </>
  )
}
