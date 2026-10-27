import { useState, type SubmitEvent } from 'react'
import { API_URL } from '../notes'
import { useNavigate } from 'react-router';

// A page with a form: POST, then navigate to the new note's own page
const NewNote = () => {
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    const data = await response.json()

    if (!response.ok) {
      setMessage(`❌ ${data.message}`) // e.g. 'The note needs a "text"'
      return
    }
    // The server created the id, so we can only build the URL now: /notes/4
    navigate(-1)
  }

  return (
    <>
      <h1>New note</h1>
      {message && <p role="status">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="note-text">Text </label>
        <input id="note-text" value={text} onChange={(e) => setText(e.target.value)} />
        <button>Save</button>
      </form>
    </>
  )
}

export default NewNote
