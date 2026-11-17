import { sleep } from '@/lib/products'

/**
 * Without this, Next would render the page once at BUILD time (the 2 second wait would
 * happen there), and users would get instant HTML with no loading state at all.
 * We force it to render per request so we can see loading.tsx do its job.
 */
export const dynamic = 'force-dynamic'

// A Server Component can be async and await things (a database, an API, a slow function)
export default async function SlowPage() {
  await sleep(2000) // pretend the database is slow

  return (
    <>
      <h1 className="text-2xl font-bold">Finally!</h1>
      <p className="mt-2 text-slate-600">
        This page waited 2 seconds before rendering. While it waited, Next showed <code>loading.tsx</code>.
      </p>
    </>
  )
}
