import { useState, type SubmitEvent } from 'react'
import { useNotes } from './useNotes';


const NoteManagerWithCustomHooks = () => {
  const [text, setText] = useState('')
  const {notes, message, isLoading, addNote, toggleDone, deleteNote} = useNotes()

  const handleAddForm = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    addNote(text)
    setText('')
  }


  return (
    <section style={{ textAlign: 'left', maxWidth: 480, margin: '0 auto' }}>
      <h2>Notes (saved on the server)</h2>
      {message && <p role="status">{message}</p>}
      {isLoading && <p>Loading ...</p>}

      <form onSubmit={handleAddForm}>
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
