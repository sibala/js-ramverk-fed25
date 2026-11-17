/**
 * Reading environment variables in one place, so a missing variable fails loudly
 * and early instead of as a confusing error deep inside a query.
 *
 * Next.js loads .env.local automatically. Variables WITHOUT the NEXT_PUBLIC_ prefix
 * are server-only: they never reach the browser. A database password must never
 * have that prefix.
 */
export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable ${name}. Add it to .env.local (see .env.example)`)
  }
  return value
}
