import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sql, type Pun } from '@/lib/db'
import DeletePunButton from './DeletePunButton'

/**
 * One pun, straight from the database. Compare with 1-routing/puns/[id]/page.tsx:
 * the same await params and notFound(), but sql`...` instead of fetch.
 */
export default async function PunPage({ params }: PageProps<'/2-database/[id]'>) {
  const { id } = await params

  let pun: Pun | undefined
  try {
    const puns = await sql<Pun[]>`select * from puns where id = ${id}`
    pun = puns[0]
  } catch {
    // /2-database/abc isn't a uuid: Postgres throws an error
  }
  if (!pun) notFound() // outside the try: notFound() works by throwing, and catch would stop it

  return (
    <>
      <p className="text-sm text-slate-500">
        {pun.category}
      </p>
      <h1 className="mt-1 text-2xl font-bold">{pun.content}</h1>
      <div className="mt-4 flex gap-4">
        <Link href="/2-database" className="text-indigo-700 underline">
          Back to the puns
        </Link>
        <DeletePunButton id={pun.id} />
      </div>
    </>
  )
}
