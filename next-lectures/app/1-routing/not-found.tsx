import Link from 'next/link'

// Shown when notFound() is called below /1-routing (and for unknown URLs here)
export default function NotFound() {
  return (
    <>
      <h1 className="text-2xl font-bold">We don&apos;t sell that</h1>
      <p className="mt-2 text-slate-600">The product you asked for doesn&apos;t exist.</p>
      <Link href="/1-routing/products" className="mt-4 inline-block text-indigo-700 underline">
        Back to the products
      </Link>
    </>
  )
}
