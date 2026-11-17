import fs from 'node:fs'
import path from 'node:path'
import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from '@/db/schema'
import { requireEnv } from './env'

/**
 * The database connection. The Next.js version of `src/config/db.ts` from the API course:
 * still mysql2, still a pool.
 *
 * Three things are different from Express:
 *
 * 1. THE SINGLETON. Next reloads your code on every change in development, and in
 *    production every serverless function is its own process. Without the cache below
 *    you'd open a new pool on every reload and hit Aiven's connection limit.
 *
 * 2. TLS. Aiven signs its certificate with its own CA, so we must point at ca.pem.
 *
 * 3. THE CA IN PRODUCTION (lecture 22). `ca.pem` is gitignored, so it does NOT exist
 *    on Vercel. Two ways out, and we support both:
 *      - locally:       the file ca.pem in the project root
 *      - in production: the whole certificate in the environment variable DB_CA_CERT
 *    Paste the contents of ca.pem into a Vercel environment variable, newlines and all.
 */
const globalForDb = globalThis as unknown as { pool?: mysql.Pool }

function readCaCertificate(): string {
  // Production (Vercel): the certificate comes from an environment variable
  const fromEnv = process.env.DB_CA_CERT
  if (fromEnv) {
    // Some hosts collapse newlines into the literal characters \n. Put them back
    return fromEnv.includes('\\n') ? fromEnv.replace(/\\n/g, '\n') : fromEnv
  }

  // Local development: the file next to the project
  const caPath = path.join(process.cwd(), 'ca.pem')
  if (fs.existsSync(caPath)) {
    return fs.readFileSync(caPath, 'utf8')
  }

  throw new Error(
    'No CA certificate found. Locally: put ca.pem in the project root. In production: set DB_CA_CERT.',
  )
}

function createPool() {
  // Aiven's URI ends with ?ssl-mode=REQUIRED, which mysql2 doesn't understand,
  // so we read the parts ourselves and pass ssl explicitly
  const url = new URL(requireEnv('DB_URL'))

  return mysql.createPool({
    host: url.hostname,
    port: Number(url.port),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.slice(1),
    ssl: { ca: readCaCertificate() },
    /**
     * Keep the pool SMALL. On Vercel every serverless instance creates its own pool,
     * so "5 connections" can quietly become 50 when traffic arrives. The free Aiven
     * plan allows very few, and when they run out the site simply stops working.
     */
    connectionLimit: process.env.NODE_ENV === 'production' ? 2 : 5,
    idleTimeout: 30_000, // hand connections back instead of holding them open
  })
}

const pool = globalForDb.pool ?? createPool()
if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool

export const db = drizzle(pool, { schema, mode: 'default' })

/**
 * Drizzle wraps driver errors, so the mysql2 error code you know from Express
 * (ER_DUP_ENTRY, ER_NO_REFERENCED_ROW_2 ...) sits on error.cause, not on error.
 */
export function mysqlErrorCode(error: unknown): string | undefined {
  const err = error as { code?: string; cause?: { code?: string } }
  return err?.code ?? err?.cause?.code
}
