---
marp: true
paginate: true
title: Lecture 18 – Express moves into Next.js
---

# Lecture 18

## Express moves into Next.js

Our own backend, in the same project

---

## Today

1. Where did Express go?
2. A route: Express → Route Handler
3. MongoDB → Postgres
4. The pages: read the database directly
5. Your pun app: `_id` → `id`

Code: `next-lectures` (`app/api/puns`, `app/2-database`)

---

# 1. Where did Express go?

---

## Lecture 13: two projects

```
Browser                         Vercel                Atlas
┌──────────────────┐  fetch     ┌──────────────┐     ┌──────────┐
│ puns-client-next │ ─────────▶ │ Pun API      │ ──▶ │ MongoDB  │
│ (Next.js)        │ ◀───────── │ (Express)    │     └──────────┘
└──────────────────┘   JSON     └──────────────┘
```

Two repos, two deploys, and CORS in between

---

## Today: one project

```
Browser                Next.js (one project)                Supabase
┌───────────┐  fetch   ┌───────────────────────────┐       ┌──────────┐
│ the pages │ ───────▶ │ app/api/puns  (the API)   │ ────▶ │ Postgres │
│           │ ◀─────── │ app/...       (the pages) │       └──────────┘
└───────────┘   JSON   └───────────────────────────┘
```

> The Express server is still there. It just lives **inside** Next.js

---

## The ideas stay

From the API course:

- **REST**: GET, POST, PATCH, DELETE, and status codes
- **JSON** in and out
- **Routes** and params
- **Environment variables** for secrets
- **SQL**
- Validation, and clear error messages

---

# 2. A route: Express → Route Handler

---

## The URL is the folder

```
Express (routes/puns.js)              Next.js (app/api/puns/)

router.get('/')                  →    route.ts             export function GET
router.post('/')                 →    route.ts             export function POST
router.get('/categories')        →    categories/route.ts  export function GET
router.get('/:punId')            →    [id]/route.ts        export function GET
router.patch('/:punId')          →    [id]/route.ts        export function PATCH
router.delete('/:punId')         →    [id]/route.ts        export function DELETE
```

The **folder** is the URL, the **function name** is the HTTP method

---

## GET one pun: Express

```js
router.get('/:punId', async (req, res) => {
  try {
    const pun = await Pun.findById(req.params.punId)
    if (!pun) return res.status(404).json({ message: 'Pun not found' })
    res.json(pun)
  } catch (error) {
    res.status(404).json({ message: 'Pun not found' })
  }
})
```

---

## GET one pun: Route Handler

`app/api/puns/[id]/route.ts`

```ts
export async function GET(_request: Request, ctx: RouteContext<'/api/puns/[id]'>) {
  const { id } = await ctx.params // Express: req.params.punId

  try {
    const [pun] = await sql<Pun[]>`select * from puns where id = ${id}`
    if (!pun) {
      return Response.json({ message: 'Pun not found' }, { status: 404 })
    }
    return Response.json(pun)
  } catch {
    // /api/puns/abc isn't a uuid: Postgres throws an error
    return Response.json({ message: 'Pun not found' }, { status: 404 })
  }
}
```

Same steps: read the id, ask the database, 404 or the pun

---

## What is `ctx`?

A Route Handler gets **two** arguments from Next.js

```ts
export async function GET(request: Request, ctx: RouteContext<'/api/puns/[id]'>) {
  const { id } = await ctx.params   // /api/puns/9f1c2e4a-... → "9f1c2e4a-..."
```

| | What it is | Express |
|---|---|---|
| `request` | the request: URL, headers, body | `req` |
| `ctx` | the **context**: extra info about the route, here `params` | `req.params` |

- `ctx` is short for **context**. It's just a name: `context` or `{ params }` works the same
- `RouteContext<'/api/puns/[id]'>` gives `params` the right type: `{ id: string }`
- `params` is a Promise, like in `page.tsx`: `await` it
- `_request` with `_`: "we get it, but don't use it"

---

## Express → Next.js

<style scoped>table { font-size: 0.95em; }</style>

| Express | Next.js |
|---|---|
| `req.params.punId` | `const { id } = await ctx.params` |
| `req.query.category` | `new URL(request.url).searchParams.get('category')` |
| `req.body` | `await request.json()` |
| `res.json(pun)` | `return Response.json(pun)` |
| `res.status(404).json({ message })` | `Response.json({ message }, { status: 404 })` |
| `.env` | `.env`, but only server code can read it |
| `cors()` | not needed: same address |

---

## POST: validate, then save

```ts
export async function POST(request: Request) {
  const body = await request.json()   // Express: req.body

  if (!body.content || !body.category) {
    return Response.json({ message: 'Content and category are required' }, { status: 400 })
  }

  const [pun] = await sql<Pun[]>`
    insert into puns (content, category)
    values (${body.content}, ${body.category})
    returning *`

  return Response.json(pun, { status: 201 })
}
```

> Mongoose checked the schema for us. Now we check it ourselves (`puns-fullstack/lib/validate.ts` has the same messages as Express)

---

# 3. MongoDB → Postgres

---

## A collection becomes a table

`db/setup.sql`, run once in Supabase's SQL Editor

```sql
create table puns (
  id       uuid        primary key default gen_random_uuid(),
  content  text        not null,
  category text        not null check (category in ('animals', 'food', ...)),
  date     timestamptz not null default now()
);
```

- `gen_random_uuid()`: the database creates a random id, `"9f1c2e4a-5b6d-..."`
- `check`: the database refuses a category that isn't on the list
- `default now()`: like `default: Date.now` in Mongoose

---

## Why `uuid` and not 1, 2, 3?

| | `integer` | `uuid` |
|---|---|---|
| Looks like | `/puns/3` | `/puns/9f1c2e4a-5b6d-4e7f-...` |
| Guess the next one? | yes: 3, 4, 5 | no |
| Type in TypeScript | `number` | `string`, like MongoDB's `_id` |

- Supabase's users (`auth.users`) already have `uuid` ids: **one id type in every table**, here and in the group project
- A guest's order page can't be found by guessing `/orders/4`
- A uuid says nothing about which row came first: sort on `date`, not on `id`

---

## Mongoose → SQL

| Mongoose | SQL with `postgres` |
|---|---|
| `Pun.find({ category })` | ``sql`select * from puns where category = ${category}` `` |
| `Pun.findById(id)` | ``sql`select * from puns where id = ${id}` `` |
| `pun.save()` | ``sql`insert into puns ... returning *` `` |
| `Pun.updateOne(...)` | ``sql`update puns set ${sql(changes)} where id = ${id} returning *` `` |
| `Pun.deleteOne(...)` | ``sql`delete from puns where id = ${id}` `` |

---

## `${...}` is safe

```ts
sql`select * from puns where id = ${id}`
```

The value is sent **next to** the SQL, as a parameter. It is never pasted into the string

```ts
// NEVER build SQL with a template string:
sql.unsafe(`select * from puns where id = ${id}`)   // SQL injection
```

> The same idea as `?` in `mysql2` in the API course

---

## The connection: `lib/db.ts`

```ts
import postgres from 'postgres'

export const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
  prepare: false, // needed for Supabase's "Transaction pooler"
})
```

- Like `connectDB()` in Express: **one** connection, shared by every request
- Only imported on the **server** (Route Handlers, Server Components): the password never reaches the browser
- `DATABASE_URL` in `.env`, and in Vercel's Environment Variables

---

# 4. The pages: read the database directly

---

## A Server Component doesn't need the API

`app/2-database/page.tsx`

```tsx
export default async function DatabasePage() {
  await connection()   // read the database on every visit
  const puns = await sql<Pun[]>`select * from puns order by date, id`
  return <ul>{puns.map((pun) => <li key={pun.id}>{pun.content}</li>)}</ul>
}
```

It already runs on the server, so it asks the database itself

```
Server Component  ──sql──▶  Postgres                    no fetch, no API
Client Component  ──fetch('/api/puns')──▶  Route Handler  ──sql──▶  Postgres
```

---

## A Client Component still needs the API

The browser can't import `lib/db.ts`: the password would be sent with it

```tsx
'use client'
const response = await fetch('/api/puns', { method: 'POST', body: ... })
router.refresh()   // render the Server Component list again, with the new pun
```

| Where | Reads | Writes |
|---|---|---|
| Server Component | `` sql`select ...` `` | |
| Client Component | `fetch('/api/puns')` | `fetch` with POST, PATCH, DELETE |

> Server: read the database directly. Browser: fetch your own API

---

# 5. Your pun app: `_id` → `id`

---

## Almost nothing

```diff
- export const API_URL = 'https://pun-api-with-auth.vercel.app/api/puns'
+ export const API_URL = '/api/puns'
```

```diff
  export type Pun = {
-   _id: string   // MongoDB: "6ad4a75ddc7ab23b817d993a"
+   id: string    // Postgres: "9f1c2e4a-5b6d-4e7f-..."
    content: string
    category: string
    date: string
-   __v: number
  }
```

Still a string: rename `_id` to `id`, and TypeScript shows every `pun._id` to fix

---

## Summary

- A **Route Handler** is an Express route: the folder is the URL, the function name is the method
- `req` / `res` become `Request` / `Response.json(...)`
- MongoDB collection → Postgres **table**, Mongoose → **SQL**
- `${...}` in `` sql`...` `` is a parameter: safe from SQL injection
- A **Server Component** reads the database directly. A **Client Component** fetches `/api/...`
- The pages hardly change: `API_URL`, and `_id` → `id`
- The API and the pages are **one project**: one repo, one deploy, no CORS

---

## Next

- Code-along: `next-lectures/app/api/puns`, then `app/2-database`
- Compare: `pun-api/routes/puns.js` ↔ `app/api/puns/[id]/route.ts`
- Exercise: **Puns full-stack**, your own `puns-client-next` with its own database
- Lecture 19: Server Actions, a form without an API
