'use client' // runs in the BROWSER, like PunDetailPage in puns-client-v3

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * The SAME pun page as page.tsx, but as a Client Component (CSR). Compare the two files.
 *
 * This file is NOT a route: only a file called page.tsx becomes a URL.
 * To try it: rename page.tsx to page-server.tsx, and this file to page.tsx.
 *
 * - The component can't be async, so no "await params". useParams() reads [id] instead,
 *   from next/navigation (not react-router)
 * - useRouter() replaces useNavigate(): router.back() goes back, router.push('/1-routing/puns')
 *   goes to a URL (e.g. after you DELETE a pun)
 * - notFound() can't be used inside useEffect, so we show our own message, like in v3
 */

const API_URL = 'https://pun-api-with-auth.vercel.app/api/puns'

type Pun = {
  _id: string
  content: string
  category: string
}

export default function PunPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [pun, setPun] = useState<Pun | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPun = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`) // GET /api/puns/6ad4a0b6...
        const data = await response.json()

        // /1-routing/puns/nope → the API answers 404 { message: 'Pun not found' }
        if (!response.ok) {
          setError(data.message)
          return
        }
        setPun(data)
      } catch {
        setError('Could not load the pun')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPun()
  }, [id])

  if (isLoading) return <p>Loading...</p>
  if (error || !pun) return <p className="text-red-700">{error}</p>

  return (
    <>
      <p className="text-sm text-slate-500">{pun.category}</p>
      <h1 className="mt-1 text-2xl font-bold">{pun.content}</h1>
      <button onClick={() => router.back()} className="mt-4 text-indigo-700 underline">
        Back
      </button>
    </>
  )
}
