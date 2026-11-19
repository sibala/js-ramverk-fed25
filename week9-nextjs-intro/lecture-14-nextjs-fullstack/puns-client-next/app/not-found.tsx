import Link from 'next/link'

// Shown when notFound() is called below /1-routing. Unknown URLs get here via [...rest]/page.tsx
export default function NotFound() {
  return (
    <>
      <h1 className="text-2xl font-bold">404 page doesn&apos;t exist</h1>   
      <Link href="/">Back to puns list</Link> 
    </>
  )
}
