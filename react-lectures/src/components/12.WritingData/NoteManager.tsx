import { useEffect, useState, type SubmitEvent } from 'react'

/**
 * Writing data: POST, PATCH and DELETE with fetch.
 * NOTE! Start the API (../notes-api) in a second terminal first:  npm run api   (in react-lectures-fed25)
 *
 * A GET is just fetch(url). For the other methods we add up to three things:
 *  - method:  'POST', 'PATCH' or 'DELETE'
 *  - headers: tell the server that the body is JSON
 *  - body:    the data, turned into a string with JSON.stringify
 *
 * The API answers every write with a message: { message: 'Note created', note: { ... } }
 */

type Note = {
  id: number
  text: string
  done: boolean
}

const NoteManager = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3001/notes')
      const data = await response.json()
      setNotes(data)
    } catch {
      setMessage('❌ Could not reach the API. Is it running?')
    }
  }

  // GET: repetition of lecture 8
  useEffect(() => {
    fetchNotes()
  }, [])

  // POST: create a note. The server creates the id, so we use the note it sends back
  const addNote = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    const data = await response.json()

    if (!response.ok) {
      setMessage(`❌ ${data.message}`) // e.g. 'The note needs a "text"'
      return
    }
    // setNotes([...notes, data.note])

     // 1 Alt: Either change the local data in setNotes, when Creating new note
    setNotes([...notes, data.note])
    
    // 2. Alt: OR re-fetch the whole list of notes from the API
    // fetchNotes()
    setMessage(`✅ ${data.message}`)
    setText('')
  }

  // PATCH: change only the fields we send
  const toggleDone = async (note: Note) => {
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
    

    // 1 Alt: Either change the local data in setNotes, when updating
    setNotes(notes.map((n) => (n.id === note.id ? data.note : n)))
    
    // 2. Alt: OR re-fetch the whole list of notes from the API
    // fetchNotes()
    setMessage(`✅ ${data.message}`)
  }

  // DELETE: no body needed, the id in the URL says which note
  const deleteNote = async (note: Note) => {
    const response = await fetch(`http://localhost:3001/notes/${note.id}`, { method: 'DELETE' })
    const data = await response.json()

    if (!response.ok) {
      setMessage(`❌ ${data.message}`)
      return
    }

    // 1 Alt: Either change the local data in setNotes, when deleting
    setNotes(notes.filter((n) => n.id !== note.id))
    
    // 2. Alt: OR re-fetch the whole list of notes from the API
    // fetchNotes()
    setMessage(`✅ ${data.message}`)
  }

  return (
    <section style={{ textAlign: 'left', maxWidth: 480, margin: '0 auto' }}>
      <h2>Notes (saved on the server)</h2>
      {message && <p role="status">{message}</p>}

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

export default NoteManager
