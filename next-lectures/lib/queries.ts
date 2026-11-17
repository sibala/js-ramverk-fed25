import { asc, eq } from 'drizzle-orm'
import { db } from './db'
import { categories, products } from '@/db/schema'
import type { ProductInput } from './validation'

/**
 * THE DATA LAYER. Every database query lives here, not in the components.
 *
 * In the API course this was your controller + model layer. In Next.js there are no
 * controllers: pages call these functions directly, because pages run on the server.
 *
 * Why a separate file?
 *  - one place to look when a query is wrong
 *  - the same function can be used by a page, a Server Action and a Route Handler
 *  - it keeps `import { db }` out of your components, so nobody accidentally
 *    imports the database into a Client Component
 */

// A plain select. Drizzle infers the return type from the schema
export function getCategories() {
  return db.select().from(categories).orderBy(asc(categories.name))
}

/**
 * A JOIN, written with relations (see db/schema.ts).
 * `with: { category: true }` is the same idea as your SQL JOIN, but typed:
 * the result has a .category object.
 */
export function getProducts(categorySlug?: string) {
  return db.query.products.findMany({
    with: { category: true },
    where: categorySlug
      ? (product, { exists, and }) =>
          exists(
            db
              .select()
              .from(categories)
              .where(and(eq(categories.id, product.categoryId), eq(categories.slug, categorySlug))),
          )
      : undefined,
    orderBy: (product, { asc }) => [asc(product.name)],
  })
}

// findFirst returns the row or undefined, so the caller must handle "not found"
export function getProductBySlug(slug: string) {
  return db.query.products.findFirst({
    where: (product, { eq }) => eq(product.slug, slug),
    with: { category: true },
  })
}

/**
 * WRITING to the database (lecture 19).
 *
 * MySQL has no RETURNING, so creating a row is two steps: insert, then read back
 * by insertId. You know this pattern from mysql2 in the API course:
 *     const [result] = await db.query<ResultSetHeader>('INSERT ...')
 *     const id = result.insertId
 */
export async function createProduct(input: ProductInput) {
  const [result] = await db.insert(products).values({
    ...input,
    price: input.price.toFixed(2), // decimal columns are strings in Drizzle
  })

  return db.query.products.findFirst({ where: eq(products.id, result.insertId) })
}

export async function updateProduct(id: number, input: ProductInput) {
  await db
    .update(products)
    .set({ ...input, price: input.price.toFixed(2) })
    .where(eq(products.id, id))

  return db.query.products.findFirst({ where: eq(products.id, id) })
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id))
}

export function getProductById(id: number) {
  return db.query.products.findFirst({ where: eq(products.id, id), with: { category: true } })
}
