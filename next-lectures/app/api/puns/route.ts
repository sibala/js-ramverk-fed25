import { sql, type Pun } from '@/lib/db'

/**
 * /api/puns: the same as router.get('/') and router.post('/') in the Express API.
 * The folder is the URL, and the function's name is the HTTP method.
 * A Route Handler returns JSON, not a page: open http://localhost:3000/api/puns
 */

// GET all puns
export async function GET() {
  const puns = await sql<Pun[]>`select * from puns order by date, id`
  return Response.json(puns) // Express: res.json(puns)
}

// POST a new pun: { "content": "...", "category": "food" }
export async function POST(request: Request) {
  const body = await request.json() // Express: req.body

  if (!body.content || !body.category) {
    // Express: res.status(400).json({ message: '...' })
    return Response.json({ message: 'Content and category are required' }, { status: 400 })
  }

  // ${...} is sent as a parameter, never pasted into the SQL: safe from SQL injection
  // returning *: Postgres sends back the new row, with the id and date it created
  const [pun] = await sql<Pun[]>`
    insert into puns (content, category)
    values (${body.content}, ${body.category})
    returning *`

  return Response.json(pun, { status: 201 })
}
