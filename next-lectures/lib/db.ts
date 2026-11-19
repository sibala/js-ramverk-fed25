import postgres from 'postgres'

/**
 * The connection to Postgres (Supabase). Like connectDB() in the Express API: one connection,
 * shared by every request. DATABASE_URL is in .env, and only the server can read it.
 *
 * Only import this file in Server Components and Route Handlers, never in a "use client" file.
 */

// In dev, Next.js reloads files when you save. globalThis keeps the same connection, instead of a new one per save
const globalForDb = globalThis as unknown as { sql?: postgres.Sql }

export const sql =
  globalForDb.sql ??
  postgres(process.env.DATABASE_URL!, {
    ssl: process.env.DATABASE_URL?.includes('localhost') ? false : 'require',
    prepare: false, // needed for Supabase's "Transaction pooler"
  })

if (process.env.NODE_ENV !== 'production') globalForDb.sql = sql

// One row in the "puns" table (db/setup.sql). In MongoDB it was "_id": a string. Now "id": also a string, a uuid
export type Pun = {
  id: string // a uuid: "9f1c2e4a-..."
  content: string
  category: string
  date: string
}
