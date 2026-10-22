/**
 * A small REST API for the "16.WritingData" code-along in react-lectures, written in Express.
 * The notes live in an array in memory: changes last until the server restarts.
 *
 * Start it in a second terminal:  npm run dev   (or "npm run api" from react-lectures-fed25)   → http://localhost:3001/notes
 *
 *   GET    /notes       → all notes
 *   POST   /notes       → create a note  { "text": "..." }      → 201 { message, note }
 *   PATCH  /notes/:id   → change some fields  { "done": true }  → 200 { message, note }
 *   DELETE /notes/:id   → delete a note                         → 200 { message, note }
 *
 * Every write answers with a message that confirms what happened, and errors with a message that explains why
 */
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors()) // let the React app (another origin: localhost:5173) call this API
app.use(express.json()) // turns a JSON body into req.body

let notes = [
  { id: 1, text: 'Learn useEffect', done: true },
  { id: 2, text: 'Fetch data from an API', done: true },
  { id: 3, text: 'POST, PATCH and DELETE', done: false },
]
let nextId = 4

app.get('/notes', (_req, res) => {
  res.json(notes)
})

app.post('/notes', (req, res) => {
  if (!req.body.text) {
   res.status(400).json({ message: 'The note needs a "text"' })
   return
  }

  const note = { id: nextId++, text: req.body.text, done: false } // the SERVER creates the id
  notes.push(note)
  res.status(201).json({ message: 'Note created', note }) // 201 Created, and the new note WITH its id
})

app.patch('/notes/:id', (req, res) => {
  const note = notes.find(note => note.id === Number(req.params.id))
  if (!note) {
    res.status(404).json({ message: 'Note not found' })
    return
  } 

  // A new object: the old fields, then the ones that were sent, and the id last so it can't be changed
  const updatedNote = { ...note, ...req.body, id: note.id }
  notes = notes.map((n) => (n.id === note.id ? updatedNote : n))
  res.json({ message: 'Note updated', note: updatedNote })
})

app.delete('/notes/:id', (req, res) => {
  const note = notes.find(note => note.id === Number(req.params.id))
  if (!note) {
    res.status(404).json({ message: 'Note not found' })
    return
  }

  notes = notes.filter(n => n.id !== note.id) // NOT "note => note.id !== note.id": that compares each note with itself and deletes everything
  res.json({ message: 'Note deleted', note }) // the deleted note, so the client can show what was removed
})

app.listen(3001, () => console.log('Notes API on http://localhost:3001/notes'))
