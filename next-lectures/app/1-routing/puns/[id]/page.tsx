import Link from 'next/link'
import { notFound } from 'next/navigation'

const API_URL = 'https://pun-api-with-auth.vercel.app/api/puns'

type Pun = {
  _id: string
  content: string
  category: string
}

/**
 * [id] is a DYNAMIC segment: /1-routing/puns/6ad4a0b6... and /1-routing/puns/abc both end up here.
 * Like { path: 'puns/:id' } in React Router, but instead of useParams() the page gets
 * "params" as a prop. In Next.js 16 it's a Promise, so we await it.
 */
export default async function PunPage({ params }: PageProps<'/1-routing/puns/[id]'>) {
  const { id } = await params

  const response = await fetch(`${API_URL}/${id}`) // GET /api/puns/6ad4a0b6...

  // The API answers 404 for an id that doesn't exist → show not-found.tsx
  if (!response.ok) notFound()

  const pun: Pun = await response.json()

  return (
    <>
      <p className="text-sm text-slate-500">{pun.category}</p>
      <h1 className="mt-1 text-2xl font-bold">{pun.content}</h1>
      <Link href="/1-routing/puns" className="mt-4 inline-block text-indigo-700 underline">
        Back to the puns
      </Link>
    </>
  )
}
