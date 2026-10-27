import { useEffect, useState } from 'react'
import { API_URL, type Note } from '../notes'
import { Link } from 'react-router';

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [message, setMessage] = useState('')

  // GET all notes: the same fetch as in "16.WritingData"
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data: Note[]) => setNotes(data))
      .catch(() => setMessage('❌ Could not reach the API. Is it running?'))
  }, [])

  return (
    <div id="page-layout">
      <section>
        <h1>Notes</h1>
        {message && <p role="status">{message}</p>}
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {/* Build the URL for the dynamic route: /notes/2 */}
              <Link to={`/notes/${note.id}`}>{note.text}</Link> {note.done && '✅'}
            </li>
          ))}
        </ul>
        <Link to="/notes/new">+ New note</Link>
      </section>
    </div>
  )
}

export default Notes
