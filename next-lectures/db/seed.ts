import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { categories, products } from './schema'

/**
 * Seed script: fills an empty database with data to work with.
 * Run with:  npm run db:seed
 *
 * Seeding is not a Next.js thing, it's a normal Node script. tsx runs TypeScript
 * directly, and dotenv-cli loads .env.local so DB_URL is available.
 */
const categorySeed = [
  { name: 'Input devices', slug: 'input' },
  { name: 'Screens', slug: 'screens' },
  { name: 'Accessories', slug: 'accessories' },
]

async function seed() {
  console.log('Clearing old data…')
  // Children first: products has a foreign key to categories
  await db.delete(products)
  await db.delete(categories)

  /**
   * DELETE doesn't reset AUTO_INCREMENT, so after a few re-seeds your categories
   * start at id 12 instead of 1. That's fine for the app, but confusing when you're
   * testing by hand ("why does categoryId 1 not exist?"). Reset the counters so a
   * fresh seed always gives the same ids.
   */
  await db.execute(sql`ALTER TABLE products AUTO_INCREMENT = 1`)
  await db.execute(sql`ALTER TABLE categories AUTO_INCREMENT = 1`)

  console.log('Inserting categories…')
  await db.insert(categories).values(categorySeed)

  // MySQL has no RETURNING, so we read back what we just inserted
  const savedCategories = await db.select().from(categories)
  const idOf = (slug: string) => savedCategories.find((category) => category.slug === slug)!.id

  console.log('Inserting products…')
  await db.insert(products).values([
    { slug: 'mechanical-keyboard', name: 'Mechanical keyboard', description: 'Clicky keys for serious coding.', price: '1299.00', categoryId: idOf('input'), inStock: true },
    { slug: 'ergonomic-mouse', name: 'Ergonomic mouse', description: 'Your wrist will thank you.', price: '699.00', categoryId: idOf('input'), inStock: true },
    { slug: 'trackball', name: 'Trackball', description: 'For when the desk is full of coffee cups.', price: '899.00', categoryId: idOf('input'), inStock: false },
    { slug: 'monitor-27', name: '27" monitor', description: 'More room for DevTools.', price: '3499.00', categoryId: idOf('screens'), inStock: true },
    { slug: 'monitor-ultrawide', name: 'Ultrawide monitor', description: 'Editor and terminal side by side.', price: '6299.00', categoryId: idOf('screens'), inStock: true },
    { slug: 'usb-c-hub', name: 'USB-C hub', description: 'Because two ports is never enough.', price: '499.00', categoryId: idOf('accessories'), inStock: true },
    { slug: 'laptop-stand', name: 'Laptop stand', description: 'Your neck will thank you.', price: '399.00', categoryId: idOf('accessories'), inStock: true },
  ])

  const saved = await db.select().from(products)
  console.log(`Done. ${saved.length} products in ${categorySeed.length} categories.`)
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
