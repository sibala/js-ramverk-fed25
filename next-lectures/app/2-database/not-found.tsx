import Link from 'next/link'

// Shown when notFound() is called below /2-database
export default function NotFound() {
  return (
    <>
      <h1 className="text-2xl font-bold">That pun isn&apos;t in the database</h1>
      <Link href="/2-database" className="mt-4 inline-block text-indigo-700 underline">
        Back to the puns
      </Link>
    </>
  )
}
