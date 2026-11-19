import Link from 'next/link'
import { connection } from 'next/server'
import { sql, type Pun } from '@/lib/db'
import AddPunForm from './AddPunForm'

/**
 * A Server Component can ask the DATABASE directly: no fetch, no API in between.
 * It runs on the server, so DATABASE_URL never reaches the browser.
 *
 * Compare with 1-routing/puns/page.tsx: there we fetched from someone else's API.
 * Now the data is in our own database, in the same project.
 */
export default async function DatabasePage() {
  await connection() // read the database on every visit, not once at npm run build

  const puns = await sql<Pun[]>`select * from puns order by date, id`

  return (
    <>
      <h1 className="text-2xl font-bold">2. Our own database</h1>
      <p className="mt-2 text-slate-600">
        {puns.length} puns from Postgres. The same data as JSON: open <code>localhost:3000/api/puns</code>
      </p>

      {/* A Client Component: a form needs useState and onSubmit. It POSTs to /api/puns */}
      <AddPunForm />

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {puns.map((pun) => (
          <li key={pun.id} className="rounded-xl border border-slate-200 bg-white p-4">
            {/* pun.id, not pun._id: a uuid from Postgres */}
            <Link href={`/2-database/${pun.id}`} className="hover:underline">
              {pun.content}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
