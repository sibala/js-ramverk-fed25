import { useEffect, useState, type SubmitEvent } from 'react'
import { API_URL, type Note } from '../notes'
import { useNavigate, useParams } from 'react-router';

/**
 * Path "notes/:noteId/edit": the same form as NewNote, filled in with the note from the URL.
 * GET the note, PATCH the new text, then navigate back to the note's page
 */
const EditNote = () => {
  const {noteId} = useParams()
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  // Fill in the form with the text the note has now
  useEffect(() => {
    fetch(`${API_URL}/${noteId}`)
      .then((response) => response.json())
      .then((data: Note) => setText(data.text))
      .catch(() => setMessage('❌ Could not reach the API. Is it running?'))
  }, [noteId])

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch(`${API_URL}/${noteId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    const data = await response.json()

    if (!response.ok) {
      setMessage(`❌ ${data.message}`)
      return
    }

    navigate('/notes')
  }

  return (
    <>
      <h1>Edit note</h1>
      {message && <p role="status">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="note-text">Text </label>
        <input id="note-text" value={text} onChange={(e) => setText(e.target.value)} />
        <button>Save</button> <a href={`/notes/${noteId}`}>Cancel</a>
      </form>
    </>
  )
}

export default EditNote
