 # Lecture 14 – Express moves into Next.js: Route Handlers and Postgres


## Video links
- *(added after the lecture)*



## Goals

After this lecture you can:

- explain where the Express server went: the API and the pages in **one** Next.js project
- create a free Postgres database on **Supabase**, and connect to it from Next.js with `DATABASE_URL`
- write **Route Handlers** in `app/api`: `GET`, `POST`, `PATCH` and `DELETE`, like the routes in Express
- query the database with SQL, safe from SQL injection with `` sql`... ${value}` ``
- read the database **directly in a Server Component**, without an API in between
- explain why a Client Component still needs the API, and update a Server Component with `router.refresh()`
- move a frontend from MongoDB's `_id` to Postgres's `id`

You practise this in the exercise **Puns full-stack**.

## 1. puns-client-next solution
We will solve the exercise `puns-client-next-exercise.md` from the previous lecture. The code solution: `puns-client-next` 


## 2. Theory

Study `slides.md`: where Express went, a route in Express vs a Route Handler, MongoDB vs Postgres, and what changes in the pages.

## 3. Set up your database

1. Create a free project at [supabase.com](https://supabase.com). Save the **database password**
2. **SQL Editor → New query**: paste `next-lectures/db/setup.sql` and click **Run**. It creates the `puns` table and adds 12 puns. Run it again to start over
3. **Connect → Connection string → Transaction pooler** (port `6543`). Copy the **whole** string, and only replace `[YOUR-PASSWORD]` with your password. Don't copy the host from `.env.example`: it's different for every project (`aws-0-...` or `aws-1-...`, and the region). A wrong host gives `tenant/user postgres.xxxx not found`
4. In `next-lectures`:

```bash
cp .env.example .env     # paste the connection string as DATABASE_URL
npm install
npm run dev
```

`.env` is in `.gitignore`. **Never commit it**: the password is in it. Restart `npm run dev` when you change it: Next.js only reads it when the server starts.

## 4. Code walkthrough: `next-lectures/app/api/puns/` (the API)

The Express routes from the Pun API, as Route Handlers. The folder is the URL, and the function's name is the HTTP method.

1. `db/setup.sql`: the table. A MongoDB collection becomes a table, and `_id` becomes `id`, a `uuid` the database creates. Still a string
2. `lib/db.ts`: the connection, like `connectDB()` in Express. Only the server can read `DATABASE_URL`
3. `app/api/puns/route.ts`: `GET` all puns and `POST` a new one. Open http://localhost:3000/api/puns
4. `app/api/puns/[id]/route.ts`: `GET` one and `DELETE`. `[id]` is `:punId`, and `ctx.params` is `req.params`. `PATCH` is missing on purpose: you write it yourself in the exercise
5. Test `POST` and `DELETE` in Thunder Client or Postman, like in the API course

## 5. Code walkthrough: `next-lectures/app/2-database/` (the pages)

```bash
npm run dev     # http://localhost:3000/2-database
```

1. `2-database/page.tsx`: a Server Component that asks the **database** directly with `` sql`select ...` ``. No fetch, no API. Compare with `1-routing/puns/page.tsx`
2. `2-database/[id]/page.tsx`: one pun from the database, `await params` and `notFound()`
3. `AddPunForm.tsx`: a Client Component. The browser can't use `lib/db.ts`, so it POSTs to `/api/puns`. Then `router.refresh()` renders the list again on the server
4. `[id]/DeletePunButton.tsx`: only the button is client code. `DELETE /api/puns/[id]`, then `router.push()` back to the list

> Server Component: read the database directly. Client Component: fetch your own API.

## 6. Exercise: Puns full-stack

`puns-fullstack-exercise.md`

Give your own `puns-client-next` (lecture 13) its own backend: a Supabase database, and the Pun API's routes as Route Handlers in `app/api/puns`. Then the pages talk to your API instead of the Pun API online, and `_id` becomes `id`. `pun-api` (next to the exercise) is the Express version of the API: compare its `routes/puns.js` with your Route Handlers.

## 6. Reading instructions

- [Route Handlers (Next.js)](https://nextjs.org/docs/app/getting-started/route-handlers)
- [`route.ts` API reference (Next.js)](https://nextjs.org/docs/app/api-reference/file-conventions/route)
- [Fetching data in Server Components (Next.js)](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Environment variables (Next.js)](https://nextjs.org/docs/app/guides/environment-variables)
- [Postgres.js: queries](https://github.com/porsager/postgres#queries)
- [Supabase: connect to your database](https://supabase.com/docs/guides/database/connecting-to-postgres)
