'use client'

import { useEffect } from 'react'

/**
 * The app-wide error boundary (lecture 22).
 *
 * Every section can have its own error.tsx, but the ROOT needs one too — otherwise a
 * database outage gives the user React's default screen instead of a sentence they
 * can act on.
 *
 * Try it: change the database password in .env.local, restart, and open a page that
 * reads the database.
 *
 * In production `error.message` is replaced by a generic string, so you cannot leak
 * connection details to strangers. The `digest` is the id you search for in the log.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In a real project this goes to a logging service (Sentry, Axiom, Vercel logs)
    console.error(error)
  }, [error])

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
      <h1 className="text-xl font-bold text-red-900">We could not load this page</h1>
      <p className="mt-2 text-red-800">
        Something went wrong on our side, usually because the database is unavailable. Please try again in a moment.
      </p>
      {error.digest && (
        <p className="mt-2 text-sm text-red-700">
          Error id: <code>{error.digest}</code>
        </p>
      )}
      <button onClick={reset} className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-white">
        Try again
      </button>
    </div>
  )
}
