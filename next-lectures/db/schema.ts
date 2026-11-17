import { relations } from 'drizzle-orm'
import { boolean, decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { user } from './auth-schema'

/**
 * The schema IS TypeScript. This file is the ER diagram, written in code:
 * tables, columns, types, and the relationships between them.
 *
 *   categories 1 ──── * products
 *
 * `drizzle-kit` reads this file and writes the SQL migration for you, so you don't
 * hand-write CREATE TABLE any more. The types for your queries also come from here.
 */
export const categories = mysqlTable('categories', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 80 }).notNull(),
  slug: varchar('slug', { length: 80 }).notNull().unique(),
})

export const products = mysqlTable('products', {
  id: int('id').primaryKey().autoincrement(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  name: varchar('name', { length: 120 }).notNull(),
  description: text('description').notNull(),
  // Money as decimal, never as float: 0.1 + 0.2 !== 0.3
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  inStock: boolean('in_stock').notNull().default(true),
  // The foreign key. This is the "1 to many" line in your ER diagram
  categoryId: int('category_id')
    .notNull()
    .references(() => categories.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

/**
 * Relations are Drizzle's map of the joins. They let you write
 *   db.query.products.findMany({ with: { category: true } })
 * instead of a manual join. The FK above is the database constraint;
 * this is how the query builder knows about it.
 */
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}))

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}))

/**
 * ORDERS (lecture 21)
 *
 *   user 1 ──── * orders 1 ──── * orderItems * ──── 1 products
 *
 * Note orderItems.unitPrice: we COPY the price into the order line instead of
 * joining to products when we show an old order. A price change next month must not
 * rewrite what a customer paid. This is a normalisation decision you can defend in
 * your ER diagram: historical data is a snapshot, not a live lookup.
 */
export const orders = mysqlTable('orders', {
  id: int('id').primaryKey().autoincrement(),
  // Better Auth's user.id is a varchar(36), so the foreign key must match
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id),
  status: mysqlEnum('status', ['pending', 'paid', 'shipped']).notNull().default('pending'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const orderItems = mysqlTable('order_items', {
  id: int('id').primaryKey().autoincrement(),
  orderId: int('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: int('product_id')
    .notNull()
    .references(() => products.id),
  quantity: int('quantity').notNull(),
  // The price AT THE TIME OF THE ORDER
  unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
})

export const ordersRelations = relations(orders, ({ many, one }) => ({
  items: many(orderItems),
  user: one(user, { fields: [orders.userId], references: [user.id] }),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}))

export type Order = typeof orders.$inferSelect
export type OrderItem = typeof orderItems.$inferSelect

// The types of a row, inferred from the table. No duplicate type definitions
export type Category = typeof categories.$inferSelect
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

/**
 * Re-export the tables Better Auth generated, so `drizzle-kit` and `db.query`
 * see the whole database in one place (see db/auth-schema.ts).
 */
export * from './auth-schema'
