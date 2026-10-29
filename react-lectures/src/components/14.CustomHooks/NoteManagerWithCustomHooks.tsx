import { useEffect, useState, type SubmitEvent } from 'react'

type Note = {
  id: number
  text: string
  done: boolean
}

const NoteManagerWithCustomHooks = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  

  useEffect(() => {
    setIsLoading(true)
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3001/notes')
        const data = await response.json()
        setNotes(data)
      } catch {
        setMessage('❌ Could not reach the API. Is it running?')
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [])

  const addNote = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {

      
      const response = await fetch('http://localhost:3001/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()

      if (!response.ok) {
        setMessage(`❌ ${data.message}`)
        return
      }

      setNotes([...notes, data.note])
      setMessage(`✅ ${data.message}`)
      setText('')
    } catch {
      setMessage('❌ Could not reach the API. Is it running?')
    }
  }

  const toggleDone = async (note: Note) => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${note.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !note.done }),
      })
      const data = await response.json()

      if (!response.ok) {
        setMessage(`❌ ${data.message}`)
        return
      }
      
      setNotes(notes.map((n) => (n.id === note.id ? data.note : n)))
      setMessage(`✅ ${data.message}`)
    } catch {
      setMessage('❌ Could not reach the API. Is it running?')
    }
  }

  const deleteNote = async (note: Note) => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${note.id}`, { method: 'DELETE' })
      const data = await response.json()

      if (!response.ok) {
        setMessage(`❌ ${data.message}`)
        return
      }

      setNotes(notes.filter((n) => n.id !== note.id))
      setMessage(`✅ ${data.message}`)
    } catch {
      setMessage('❌ Could not reach the API. Is it running?')
    }
  }

  return (
    <section style={{ textAlign: 'left', maxWidth: 480, margin: '0 auto' }}>
      <h2>Notes (saved on the server)</h2>
      {message && <p role="status">{message}</p>}
      {isLoading && <p>Loading ...</p>}

      <form onSubmit={addNote}>
        <label htmlFor="note-text">New note </label>
        <input id="note-text" value={text} onChange={(e) => setText(e.target.value)} />
        <button>Add</button>
      </form>

      
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <label>
              <input type="checkbox" checked={note.done} onChange={() => toggleDone(note)} /> {note.text}
            </label>

            <button style={{color: 'red'}} onClick={() => deleteNote(note)} aria-label={`Delete ${note.text}`}>
              ✕
            </button>
          </li>
        ))}
      </ul>
      <p>
        <small>
          Reload the page: the notes are still there, because they live on the server. Restart the API and they're back
          to the start. See notes-api/server.js
        </small>
      </p>
    </section>
  )
}

export default NoteManagerWithCustomHooks
