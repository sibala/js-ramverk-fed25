/**
 * What we EXPECT the API to send back.
 * response.json() returns `any`, so this type is our promise to TypeScript.
 * (In a real project you can check it at runtime with a library like Zod.)
 * Docs: https://pun-api-with-auth.vercel.app/docs (scroll down to "Schemas")
 */
export type Pun = {
  _id: string // created by the database (MongoDB), so it's "_id" and not "id"
  content: string
  category: string
  date: string // JSON has no Date type, so dates arrive as text: "2026-10-18T10:37:57.547Z"
  __v: number // used internally by the database, we can ignore it
}
