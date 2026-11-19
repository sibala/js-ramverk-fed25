# Exercise: Puns full-stack

Give **your own** `puns-client-next` (lecture 13) its own backend. The Express routes from the Pun API become **Route Handlers** in `app/api/puns`, and the puns are saved in **Postgres on Supabase** instead of MongoDB.

You have everything you need from `next-lectures`: `lib/db.ts`, `app/api/puns` and `app/2-database`.

Solution: `puns-fullstack/`

## Part 1: The database

- Make a copy of your `puns-client-next` and call it `puns-fullstack`, or keep working in it
- Create a Supabase project, and run `db/setup.sql` from `next-lectures` in the **SQL Editor**, like in the lecture
- Put the connection string (Transaction pooler, port `6543`) in `.env` as `DATABASE_URL`. Copy the **whole** string from Supabase and only replace `[YOUR-PASSWORD]`: the host is different for every project
- Check that `.env*` is in `.gitignore`, and restart `npm run dev` when you change `.env`
- Install the database package:

```bash
npm install postgres
```

- Create `lib/db.ts` with the connection. You can copy it from `next-lectures`

## Part 2: GET all puns and the categories

Your pages call `/categories`, `?category=...` and `/:id`. Look in `pun-api/routes/puns.js` (next to this exercise) for what each route does.

- `app/api/puns/route.ts`: `export async function GET`. Return all puns with `Response.json(...)`
- Filter: `/api/puns?category=food` gives only the food puns. Read it with `new URL(request.url).searchParams.get('category')` (Express: `req.query.category`)
- `app/api/puns/categories/route.ts`: return the list of categories as JSON
- Test in the browser: http://localhost:3000/api/puns, `/api/puns?category=food` and `/api/puns/categories`

Why doesn't `/api/puns/categories` end up in `[id]`? Compare with the order of the routes in Express.

## Part 3: One pun, PATCH and DELETE

`app/api/puns/[id]/route.ts`, with three functions: `GET`, `PATCH` and `DELETE`

- `(await ctx.params).id` is the id (Express: `req.params.punId`)
- `/api/puns/abc`, and a uuid that doesn't exist, should answer **404** with `{ "message": "Pun not found" }`
- Test with Thunder Client or Postman

### PATCH on your own

`PATCH` isn't in the walkthrough: write it yourself. Compare with `router.patch` in `pun-api/routes/puns.js`, and with `GET` and `DELETE` in your own `route.ts`.

- `PATCH /api/puns/<id>` with `{ "content": "...", "category": "food" }` changes the pun, and answers with the changed pun
- A body with neither `content` nor `category` answers **400** with a `message`
- An id that doesn't exist, or `abc`, answers **404** with `{ "message": "Pun not found" }`
- Tip: the body is `await request.json()` (Express: `req.body`), and SQL has `update ... set ... where ...`. How do you get the changed row back? Look at `POST` in `next-lectures/app/api/puns/route.ts`

## Part 4: POST

- Add `POST` to `app/api/puns/route.ts`: `insert into puns ... returning *`, and answer **201** with the new pun
- An empty `content` or `category` should answer **400** with a `message`, like the Express API

Always use `${...}` inside `` sql`...` ``: it's sent as a parameter, and is safe from SQL injection.

## Part 5: The pages talk to your API

- In `lib/config.ts`: `API_URL = '/api/puns'`. A relative URL: the same project, so no CORS
- In `lib/types.ts`: `_id` becomes `id` (still a `string`: a uuid), and remove `__v`
- Test everything in the browser: the list, the filter, a pun's page, add, edit, delete, and `/puns/abc`

## Part 6 (extra): Deploy

- Push to GitHub, import the project in Vercel, and add `DATABASE_URL` under *Settings → Environment Variables*
- One repo, one deploy: the API and the pages together
