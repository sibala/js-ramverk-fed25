'use client'

/**
 * The LAST line of defence: an error that escapes every error.tsx, including one
 * thrown by the root layout itself.
 *
 * Because it replaces the root layout, this file must render its own <html> and <body>.
 *
 * In production React deliberately hides the message from the user and gives you a
 * `digest` instead — the same id appears in the server log, so you can find the real
 * error without showing strangers your stack trace.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '3rem', maxWidth: '40rem', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ color: '#475569' }}>
          We could not load the page. Please try again, and if it keeps happening, contact us.
        </p>
        {error.digest && (
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Error id: <code>{error.digest}</code>
          </p>
        )}
        <button
          onClick={reset}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', background: '#0f172a', color: 'white', border: 0 }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
