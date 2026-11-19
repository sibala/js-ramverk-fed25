/**
 * loading.tsx is automatically a <Suspense> boundary around the page.
 * While the page's async work runs, Next shows this instead. The layout above stays put.
 */
export default function Loading() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-8 w-1/3 rounded bg-slate-200" />
      <div className="h-4 w-2/3 rounded bg-slate-200" />
      <div className="h-4 w-1/2 rounded bg-slate-200" />
      <p className="text-sm text-slate-500">Loading… (this is loading.tsx)</p>
    </div>
  )
}
