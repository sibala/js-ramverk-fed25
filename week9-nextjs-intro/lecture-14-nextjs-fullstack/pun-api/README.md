# pun-api

A simple Pun API in Express and MongoDB (Mongoose). The same routes as the Pun API you have used in the course, without login.

In lecture 18 you move these routes into Next.js: compare `routes/puns.js` with `app/api/puns/route.ts` and `app/api/puns/[id]/route.ts`.

| Method | URL | Does |
|---|---|---|
| GET | `/api/puns` | all puns |
| GET | `/api/puns?category=food` | only the food puns |
| GET | `/api/puns/categories` | the list of categories |
| GET | `/api/puns/:punId` | one pun |
| POST | `/api/puns` | a new pun: `{ "content": "...", "category": "food" }` |
| PATCH | `/api/puns/:punId` | change content and/or category |
| DELETE | `/api/puns/:punId` | delete one pun |

## Run it (optional)

You don't need to run it for the exercise, but you can, with your own MongoDB Atlas database:

```bash
npm install
cp .env.example .env     # paste your MongoDB connection string as DB_URL
npm run dev              # http://localhost:4000/api/puns
```

## Files

- `api.js`: the server: middlewares, routes, connect to the database
- `models/Pun.js`: what a pun looks like, and the allowed categories
- `routes/puns.js`: all routes for `/api/puns`
