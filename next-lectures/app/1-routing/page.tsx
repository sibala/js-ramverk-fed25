export default function RoutingOverview() {
  return (
    <>
      <h1 className="text-2xl font-bold">1. Routing and layouts</h1>
      <p className="mt-2 text-slate-600">
        In Next.js the <strong>file system is the router</strong>. There is no route configuration like in React
        Router: a folder with a <code>page.tsx</code> becomes a URL.
      </p>

      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`app/
├── layout.tsx                → wraps everything (the root layout)
├── page.tsx                  → /
└── 1-routing/
    ├── layout.tsx            → wraps everything below
    ├── page.tsx              → /1-routing
    ├── loading.tsx           → shown while a page below is loading
    ├── error.tsx             → shown when a page below throws
    └── puns/
        ├── page.tsx          → /1-routing/puns
        └── [id]/
            └── page.tsx      → /1-routing/puns/6ad4a0b696a9800008d16881`}</pre>

      <h2 className="mt-6 text-xl font-semibold">Compare with React Router</h2>
      <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
        <li>
          <code>createBrowserRouter([...])</code> → the folder structure
        </li>
        <li>
          <code>&lt;Outlet /&gt;</code> → <code>{'{children}'}</code> in <code>layout.tsx</code>
        </li>
        <li>
          <code>&lt;Link to&gt;</code> → <code>&lt;Link href&gt;</code> from <code>next/link</code>
        </li>
        <li>
          <code>useParams()</code> → <code>params</code>, a prop on the page (and it&apos;s a Promise!)
        </li>
        <li>
          <code>ErrorBoundary</code> → <code>error.tsx</code>, and 404 → <code>not-found.tsx</code>
        </li>
      </ul>

      <p className="mt-4 text-slate-600">
        Notice the timestamp in the blue bar. Navigate between the pages: it doesn&apos;t change, because the layout
        isn&apos;t re-rendered. That&apos;s the same idea as a layout route in React Router.
      </p>
    </>
  )
}
