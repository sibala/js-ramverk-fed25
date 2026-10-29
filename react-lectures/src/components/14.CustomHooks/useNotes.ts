import { useEffect, useState } from "react";


type Note = {
  id: number
  text: string
  done: boolean
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  // Triggers only On Mount
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


  const addNote = async (text: string) => {
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

  return {notes, message, isLoading, addNote, toggleDone, deleteNote}
}