import { NextResponse } from 'next/server'
import { mysqlErrorCode } from '@/lib/db'
import { createProduct, getProducts } from '@/lib/queries'
import { fieldErrors, productSchema } from '@/lib/validation'

/**
 * ROUTE HANDLERS: a real HTTP API inside Next.js.
 * This file is your Express router + controller, with the same job:
 *
 *   Express                          Next.js
 *   router.get('/products', ctrl)    export async function GET(request)
 *   router.post('/products', ctrl)   export async function POST(request)
 *   res.status(201).json(data)       return NextResponse.json(data, { status: 201 })
 *
 * A file called route.ts becomes the endpoint for its folder:
 *   app/api/products/route.ts  →  /api/products
 *
 * Test it in Insomnia exactly like you tested your Express API.
 *
 * When do you need this instead of a Server Action?
 *  - when something OTHER than your own form calls it (a mobile app, another service, a webhook)
 *  - when you need a specific HTTP method, status code or header
 * For your own forms, a Server Action is less code and needs no fetch.
 */

// GET /api/products?category=screens
export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get('category') ?? undefined
  const products = await getProducts(category)

  return NextResponse.json(products)
}

// POST /api/products   body: { name, slug, description, price, categoryId, inStock }
export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'The body must be valid JSON' }, { status: 400 })
  }

  // The SAME schema the form uses. One source of truth for what a product is
  const parsed = productSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', fields: fieldErrors(parsed.error) }, { status: 400 })
  }

  try {
    const product = await createProduct(parsed.data)
    // 201 Created + the created resource, like in the API course
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    /**
     * The database has the last word. Two constraints can fail here, and they deserve
     * different status codes. mysql2 gives you the same error codes you saw in Express:
     *   ER_DUP_ENTRY (1062)          the slug is taken            → 409 Conflict
     *   ER_NO_REFERENCED_ROW_2 (1452) the categoryId doesn't exist → 400 Bad Request
     */
    const code = mysqlErrorCode(error)

    if (code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: `The slug "${parsed.data.slug}" is already taken` }, { status: 409 })
    }
    if (code === 'ER_NO_REFERENCED_ROW_2') {
      return NextResponse.json({ error: `There is no category with id ${parsed.data.categoryId}` }, { status: 400 })
    }

    console.error(error)
    return NextResponse.json({ error: 'Could not create the product' }, { status: 500 })
  }
}
