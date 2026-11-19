'use client' // error.tsx must be a Client Component: it needs state and an onClick

import { useEffect } from 'react'

/**
 * An error boundary for everything below /1-routing.
 * "reset" re-renders the segment, so the user can try again without a full page reload.
 */
type ErrorType = { 
  error: Error & { digest?: string } 
  reset: () => void 
}

export default function Error({ error, reset }: ErrorType) {
  useEffect(() => {
    // In a real app: send this to your logging service
    console.error(error)
  }, [error])

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
      <h1 className="text-2xl font-bold text-red-800">Something went wrong</h1>
      <p className="mt-2 text-red-700">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white">
        Try again
      </button>
      <p className="mt-3 text-sm text-red-700">
        In production the message is replaced by a generic one, so you don&apos;t leak server details. The
        <code> digest</code> lets you find the real error in the server logs.
      </p>
    </div>
  )
}
