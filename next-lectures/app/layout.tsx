import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

/**
 * The ROOT LAYOUT wraps every page. It renders <html> and <body> (no page does),
 * and it does NOT re-render when you navigate between pages: its state is kept.
 */
export const metadata: Metadata = {
  title: 'Next.js lectures – FED25',
  description: 'Code-along app for Part 3: full-stack Next.js',
}

const topics = [
  { href: '/1-routing', label: '1. Routing & layouts' },
]

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-50 text-slate-900">
        <header className="bg-slate-900 text-white">
          <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-4 p-4">
            <Link href="/" className="font-bold">
              Next lectures
            </Link>
            {topics.map((topic) => (
              <Link key={topic.href} href={topic.href} className="text-sm text-slate-300 hover:text-white">
                {topic.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-4xl p-6">{children}</main>
      </body>
    </html>
  )
}
