import Link from 'next/link'

// Shown when notFound() is called below /1-routing. Unknown URLs get here via [...rest]/page.tsx
export default function NotFound() {
  return (
    <>
      <h1 className="text-2xl font-bold">That pun doesn&apos;t exist</h1>
      <p className="mt-2 text-slate-600">The pun you asked for doesn&apos;t exist (maybe it wasn&apos;t funny enough).</p>
      <Link href="/1-routing/puns" className="mt-4 inline-block text-indigo-700 underline">
        Back to the puns
      </Link>
    </>
  )
}
