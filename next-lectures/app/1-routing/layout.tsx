import Link from 'next/link'

/**
 * A NESTED LAYOUT. It wraps everything under /1-routing, and it does NOT re-render
 * when you navigate between the pages below it. Open React DevTools and watch:
 * only the {children} part changes.
 *
 * File conventions in the app/ folder:
 *   layout.tsx     shared UI that persists across navigation
 *   page.tsx       the page itself (this is what makes a folder a route)
 *   loading.tsx    shown while the page's data is loading (a Suspense boundary)
 *   error.tsx      shown when the page throws (an error boundary, must be a Client Component)
 *   not-found.tsx  shown when notFound() is called
 *   [slug]/        a dynamic segment
 *   (group)/       a route group: organises files WITHOUT adding to the URL
 */
export default function RoutingLayout({ children }: LayoutProps<'/1-routing'>) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap gap-3 rounded-lg bg-indigo-50 p-3 text-sm">
        <Link href="/1-routing" className="font-medium hover:underline">
          Overview
        </Link>
        <Link href="/1-routing/products" className="hover:underline">
          Products
        </Link>
        <Link href="/1-routing/slow" className="hover:underline">
          Slow page (loading.tsx)
        </Link>
        <Link href="/1-routing/broken" className="hover:underline">
          Broken page (error.tsx)
        </Link>
        <span className="ml-auto text-slate-500">Layout rendered at {new Date().toLocaleTimeString('sv-SE')}</span>
      </div>
      {children}
    </section>
  )
}
