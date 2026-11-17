import Link from 'next/link'
import { connection } from 'next/server'

// The same Pun API as in puns-client-v3
const API_URL = 'https://pun-api-with-auth.vercel.app/api/puns'

type Pun = {
  _id: string
  content: string
  category: string
}

/**
 * A Server Component can be async: no useState, no useEffect, just await the data.
 * The fetch runs on the SERVER, so there is no CORS, and console.log ends up in the terminal.
 * While we wait, loading.tsx in the folder above is shown.
 */
export default async function PunsPage() {
  await connection() // fetch the puns on every visit, not once at npm run build

  const response = await fetch(API_URL)
  const puns: Pun[] = await response.json()

  console.log(`Fetched ${puns.length} puns on the server`)

  // http://localhost:3000/1-routing/puns/12312312423453453
  return (
    <>
      <h1 className="text-2xl font-bold">Puns list</h1>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {puns.map((pun) => (
          <li key={pun._id} className="rounded-xl border border-slate-200 bg-white p-4">
            {/* A dynamic link: one URL per pun, all handled by [id]/page.tsx */}
            <Link href={`/1-routing/puns/${pun._id}`} className="hover:underline">
              {pun.content}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-slate-500">
        Try a pun that doesn&apos;t exist:{' '}
        <Link href="/1-routing/puns/nope" className="text-indigo-700 underline">
          /1-routing/puns/nope
        </Link>
      </p>
    </>
  )
}
