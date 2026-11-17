# Lecture 17 – Next.js intro: App Router, layouts and Server Components


## Video links
- *(added after the lecture)*



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


## 3. Exercise coming soon


## 4. Reading instructions

- [Get started with Next.js](https://nextjs.org/docs/app/getting-started/installation)
- [Project structure (Next.js)](https://nextjs.org/docs/app/getting-started/project-structure)
- [Layouts and pages (Next.js)](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Linking and navigating (Next.js)](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
- [Server and Client Components (Next.js)](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Error handling (Next.js)](https://nextjs.org/docs/app/getting-started/error-handling)
- [`loading.tsx`](https://nextjs.org/docs/app/api-reference/file-conventions/loading), [`error.tsx`](https://nextjs.org/docs/app/api-reference/file-conventions/error), [`not-found.tsx`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
