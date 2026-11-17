'use client' // runs in the BROWSER, like in puns-client-v3

import Link from 'next/link'
import { useEffect, useState } from 'react'

/**
 * The SAME list as page.tsx, but as a Client Component (CSR). Compare the two files.
 *
 * This file is NOT a route: only a file called page.tsx becomes a URL.
 * To try it: rename page.tsx to page-server.tsx, and this file to page.tsx.
 *
 * - The component can't be async, so we need useState + useEffect again
 * - No connection(): it's server-only, and the fetch runs in the browser on every visit anyway
 * - loading.tsx isn't used: we show our own "Loading..." while isLoading is true
 * - The fetch comes from the browser, so the API's CORS must allow http://localhost:3000
 * - console.log ends up in the BROWSER console, not in the terminal
 * - View page source: no puns in the HTML, they are added after the JS has loaded
 */

const API_URL = 'https://pun-api-with-auth.vercel.app/api/puns'

type Pun = {
  _id: string
  content: string
  category: string
}

export default function PunsPage() {
  const [puns, setPuns] = useState<Pun[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPuns = async () => {
      try {
        const response = await fetch(API_URL)
        const data: Pun[] = await response.json()
        console.log(`Fetched ${data.length} puns in the browser`)
        setPuns(data)
      } catch {
        setError('Could not load the puns')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPuns()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p className="text-red-700">{error}</p>

  return (
    <>
      <h1 className="text-2xl font-bold">Puns list (Client Component)</h1>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {puns.map((pun) => (
          <li key={pun._id} className="rounded-xl border border-slate-200 bg-white p-4">
            <Link href={`/1-routing/puns/${pun._id}`} className="hover:underline">
              {pun.content}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
