'use client' // a form with state and onSubmit runs in the browser

import { useRouter } from 'next/navigation'
import { useState } from 'react'

/**
 * The browser can't use lib/db.ts (the password would end up in the browser).
 * So it does what it always did: fetch to an API. The difference is that the API is our own: /api/puns
 *
 * This file is NOT a route: only page.tsx becomes a URL. It's just a component next to the page.
 */
export default function AddPunForm() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('everyday')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // A relative URL: the same project, so no CORS
    const response = await fetch('/api/puns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, category }),
    })
    const data = await response.json()

    if (!response.ok) {
      setMessage(data.message)
      return
    }

    setContent('')
    setMessage('')
    // The list is a Server Component. refresh() renders it again on the server, with the new pun
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-2">
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="A new pun"
        className="flex-1 rounded border border-slate-300 bg-white px-3 py-2"
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="rounded border border-slate-300 bg-white px-3 py-2"
      >
        <option value="animals">animals</option>
        <option value="education">education</option>
        <option value="everyday">everyday</option>
        <option value="food">food</option>
        <option value="science">science</option>
        <option value="technology">technology</option>
      </select>
      <button className="rounded bg-indigo-600 px-4 py-2 text-white">Add</button>
      {message && <p className="w-full text-red-700">{message}</p>}
    </form>
  )
}
