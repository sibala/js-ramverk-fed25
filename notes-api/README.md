# Notes API

A small REST API written in Express, used by the `16.WritingData` code-along in `react-lectures` (lecture 10).
The notes live in an array in memory, so restarting the server gives you the original notes back.

```bash
npm install
npm run dev     # http://localhost:3001/notes, restarts when you edit server.js
```

(Or, from `react-lectures-fed25`: `npm run api`.)

| Method | URL | Body | Answer |
|---|---|---|---|
| GET | `/notes` | – | `200` all notes |
| POST | `/notes` | `{ "text": "..." }` | `201 { message, note }`, or `400` without `text` |
| PATCH | `/notes/:id` | e.g. `{ "done": true }` | `200 { message, note }`, or `404` |
| DELETE | `/notes/:id` | – | `200 { message, note }`, or `404` |

Errors look like `{ "message": "Note not found" }`.
