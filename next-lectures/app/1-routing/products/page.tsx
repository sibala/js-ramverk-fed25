import Link from 'next/link'
import { products } from '@/lib/products'

export default function ProductsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Products</h1>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {products.map((product) => (
          <li key={product.slug} className="rounded-xl border border-slate-200 bg-white p-4">
            {/* The URL is built from the data, exactly like in React Router */}
            <Link href={`/1-routing/products/${product.slug}`} className="font-semibold text-indigo-700 hover:underline">
              {product.name}
            </Link>
            <p className="text-sm text-slate-600">{product.price} kr</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-slate-500">
        Try a product that doesn&apos;t exist:{' '}
        <Link href="/1-routing/products/a-pony" className="underline">
          /products/a-pony
        </Link>
      </p>
    </>
  )
}
