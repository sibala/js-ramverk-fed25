import Link from 'next/link'

const lectures = [
  {
    href: '/1-routing',
    title: '1. Routing and layouts',
    description: 'Folders are routes, layouts persist, loading.tsx, error.tsx, not-found.tsx, dynamic routes',
  },
]

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">Next.js code-along</h1>
      <p className="mt-2 text-slate-600">
        One route per topic. Open the folder in <code>app/</code> next to the page you're looking at.
      </p>
      <ul className="mt-6 space-y-3">
        {lectures.map((lecture) => (
          <li key={lecture.href} className="rounded-xl border border-slate-200 bg-white p-4">
            <Link href={lecture.href} className="text-lg font-semibold text-indigo-700 hover:underline">
              {lecture.title}
            </Link>
            <p className="text-sm text-slate-600">{lecture.description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
