'use client' // onClick runs in the browser. Only this button is client code, the page stays a Server Component

import { useRouter } from 'next/navigation'

export default function DeletePunButton({ id }: { id: string }) {
  const router = useRouter()

  const deletePun = async () => {
    await fetch(`/api/puns/${id}`, { method: 'DELETE' }) // app/api/puns/[id]/route.ts → DELETE
    router.push('/2-database') // nothing left to show here: back to the list
    router.refresh() // and render the list again, without the deleted pun
  }

  return (
    <button onClick={deletePun} className="text-red-700 underline">
      Delete
    </button>
  )
}
