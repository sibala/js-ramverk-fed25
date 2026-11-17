import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'

/**
 * A HEALTH CHECK: one endpoint that answers "is the deployed app actually working?"
 *
 * After a deploy, this tells you in one request whether the environment variables and
 * the database connection survived the trip. Much faster than clicking around the UI,
 * and you can watch it from Insomnia.
 *
 * Note what it does NOT return: no connection string, no stack trace, nothing about
 * the database version. An error page on the public internet should never teach an
 * attacker about your infrastructure.
 */
export async function GET() {
  const startedAt = Date.now()

  try {
    await db.execute(sql`SELECT 1`)

    return Response.json({
      status: 'ok',
      database: 'reachable',
      ms: Date.now() - startedAt,
    })
  } catch (error) {
    // The details go to the server log, where only you can read them
    console.error('Health check failed:', error)

    return Response.json(
      { status: 'error', database: 'unreachable', ms: Date.now() - startedAt },
      { status: 503 }, // 503 Service Unavailable: we're up, the database isn't
    )
  }
}
