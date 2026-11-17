/**
 * Static data for lecture 17. In lecture 18 we replace this file with a real
 * MySQL database and Drizzle, and the components barely change.
 */
export type Product = {
  slug: string
  name: string
  price: number
  category: string
  description: string
}

export const products: Product[] = [
  { slug: 'mechanical-keyboard', name: 'Mechanical keyboard', price: 1299, category: 'Input', description: 'Clicky keys for serious coding.' },
  { slug: 'ergonomic-mouse', name: 'Ergonomic mouse', price: 699, category: 'Input', description: 'Your wrist will thank you.' },
  { slug: 'monitor-27', name: '27" monitor', price: 3499, category: 'Screens', description: 'More room for DevTools.' },
  { slug: 'usb-c-hub', name: 'USB-C hub', price: 499, category: 'Accessories', description: 'Because two ports is never enough.' },
]

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

// Pretend the database is slow, so we can see loading.tsx do its job
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
