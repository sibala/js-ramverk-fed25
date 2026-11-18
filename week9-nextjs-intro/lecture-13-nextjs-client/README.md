# Lecture 13 – Next.js intro: App Router, layouts and Server Components


## Video links
- [01 - NextJS slides](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261117%5F090705%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E9aa62225%2Def4e%2D43a9%2Db0aa%2D638fa28a2758)(50m)
- [02 - NextJS routes intro with exercise](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261117%5F102255%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E6e8f88d4%2D839b%2D49f9%2Dbecb%2D55916bffab4f)(27m)
- [03 - NextJS dynamic routes with exercise](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261117%5F113313%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Eee1a2f45%2D9a2e%2D46fb%2D8cca%2Dc47ac0530530)(41m)



## Goals

After this lecture you can:

- explain the difference between a library and a framework, and how React, Vue, Angular and Next.js differ
- explain what Next.js adds to React, and what you bring with you from the React part of the course
- create routes with the **file system**: `page.tsx`, folders, and dynamic `[id]` segments
- share UI with `layout.tsx`, and handle states with `loading.tsx`, `error.tsx` and `not-found.tsx`
- navigate with `<Link>`, `useParams()` and `useRouter()`
- explain the difference between a **Server Component** and a **Client Component**, and decide which to use

You practise routing in the exercise **My first Next.js app**.

## 1. Theory

Study `slides.md`: library or framework, React, Vue, Angular and Next.js side by side, where the code runs (server or browser), what you bring from React, and your pun app in Next.js.

## 2. Code walkthrough: `next-lectures/`

```bash
cd next-lectures
npm run dev     # http://localhost:3000
```

- **`app/1-routing/`**: the file conventions. The timestamp in the blue bar doesn't change when you navigate, because the layout isn't re-rendered
  - `puns/[slug]/page.tsx`: a dynamic route, `await params`, `notFound()` and `generateStaticParams`
  - `slow/page.tsx` + `loading.tsx`: the loading state
  - `broken/page.tsx` + `error.tsx`: the error boundary, and why `error.tsx` must be a Client Component

**Exercise: My first Next.js app** (solution: `my-first-next-app-solution/`). Create your first Next.js project with `create-next-app`: three pages (Home, About, Contact), a layout with navigation, and a 404 page.


## 3. Exercise: Puns client in Next.js

`puns-client-next-exercise.md` (solution: `puns-client-next/`)

Move your own `puns-client-v3-solution` from Vite + React Router to Next.js, against the same Pun API. The layout, the pages as folders, and the imports from `next/link` and `next/navigation`


## 4. Reading instructions

- [Get started with Next.js](https://nextjs.org/docs/app/getting-started/installation)
- [Project structure (Next.js)](https://nextjs.org/docs/app/getting-started/project-structure)
- [Layouts and pages (Next.js)](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Linking and navigating (Next.js)](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
- [Server and Client Components (Next.js)](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Error handling (Next.js)](https://nextjs.org/docs/app/getting-started/error-handling)
- [`loading.tsx`](https://nextjs.org/docs/app/api-reference/file-conventions/loading), [`error.tsx`](https://nextjs.org/docs/app/api-reference/file-conventions/error), [`not-found.tsx`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
