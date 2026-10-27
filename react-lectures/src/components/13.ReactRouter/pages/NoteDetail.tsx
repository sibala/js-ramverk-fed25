import { useEffect, useState } from 'react'
import { API_URL, type Note } from '../notes'
import { useNavigate, useParams } from 'react-router';

/**
 * A dynamic route: path "notes/:noteId"
 * useParams() reads the ":noteId" part from the URL, and we fetch that ONE note
 */
const NoteDetail = () => {
  // useParams gives string | undefined: the router can't know the URL matched
  const { noteId } =  useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState<Note | null>(null)
  const [message, setMessage] = useState('')

  // Runs again when the id in the URL changes, e.g. from /notes/1 to /notes/2
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`${API_URL}/${noteId}`) // GET /notes/2
        const data = await response.json()

        if (!response.ok) {
          setMessage(data.message) // 404: "Note not found"
          return
        }
        setNote(data)
      } catch {
        setMessage('Could not reach the API. Is it running?')
      }
    }
    fetchNote()
  }, [noteId])

  const deleteNote = async () => {
    const response = await fetch(`${API_URL}/${noteId}`, { method: 'DELETE' })
    if (response.ok) {
      // useNavigate: navigate from code. The note is gone, so go back to the list '/notes'
      navigate('/notes')
    }
  }

  // Always handle the case where the URL doesn't match any data, e.g. /notes/999
  if (message) {
    return (
      <>
        <h1>{message}</h1>
        <a href="/notes">Back to all notes</a>
      </>
    )
  }

  if (!note) return <p>Loading...</p>

  return (
    <>
      <h1>{note.text}</h1>
      <p>{note.done ? '✅ Done' : '⏳ Not done yet'}</p>
      <a href={`/notes/${note.id}/edit`}>Edit</a> <button onClick={deleteNote}>Delete</button>
      <p>
        {/* -1 = one step back in the history, like the browser's back button */}
        <button onClick={() => navigate(-1)}>Go back</button>
      </p>
    </>
  )
}

export default NoteDetail
