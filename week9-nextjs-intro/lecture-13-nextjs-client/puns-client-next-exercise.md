# Exercise: Puns client in Next.js

Move **your own** `puns-client-v3` (lecture 11) from Vite + React Router to Next.js. Against the same Pun API.

You have everything you need from `1-routing`, the exercise *My first Next.js app* and `1-routing/puns` (especially the two `page-example.tsx` files).

Solution: `puns-client-next/`

## Part 1: Create the app, and copy your code

```bash
npx create-next-app@16.3.6 puns-client-next --yes
cd puns-client-next
npm run dev     # http://localhost:3000
```

- Copy `src/components/` from v3 to `components/`
- Copy `types.ts`, `config.ts` and `utils/format.ts` to a folder `lib/`
- Replace **everything** in `app/globals.css` with the CSS from v3's `index.css`. We use your own CSS, not Tailwind
- Fix the imports: `@/` means the project folder, e.g. `import type { Pun } from '@/lib/types'`

The Pun API allows `http://localhost:3000`, so `fetch` works like in Vite.

## Part 2: The layout

`RootLayout.tsx` in v3 becomes `app/layout.tsx`:

- Move the header and the nav into `app/layout.tsx`
- `<Outlet />` becomes `{children}`
- `<NavLink>` doesn't exist in Next.js: create `components/NavLink.tsx` with `usePathname()`, like in Part 6 of *My first Next.js app*
- `<NavLink to="/" end>`: how do you make "All puns" active only on exactly `/`?

## Part 3: The pages

`App.tsx` with `createBrowserRouter` becomes folders:

| v3 | Next.js |
|---|---|
| `{ index: true, Component: PunsPage }` | `app/page.tsx` |
| `{ path: 'puns/new', ... }` | `app/puns/new/page.tsx` |
| `{ path: 'puns/:id', ... }` | `app/puns/[id]/page.tsx` |
| `{ path: 'puns/:id/edit', ... }` | `app/puns/[id]/edit/page.tsx` |
| `{ path: '*', ... }` | `app/not-found.tsx` |

- Move each page's code into its `page.tsx`, with `export default function`
- The pages use `useState` and `useEffect`: put `"use client"` at the top of each page

## Part 4: Imports from React Router

Change them in every file, like in `1-routing/puns/[id]/page-example.tsx`:

| v3 | Next.js |
|---|---|
| `import { Link } from 'react-router'` | `import Link from 'next/link'` |
| `<Link to="...">` | `<Link href="...">` |
| `useParams()` from `react-router` | `useParams<{ id: string }>()` from `next/navigation` |
| `useNavigate()`, `navigate('/puns/...')` | `useRouter()`, `router.push('/puns/...')` |
| `navigate(-1)` | `router.back()` |

When `npm run dev` shows no errors, test everything: the list, the filter, a pun's page, add, edit, delete, and `/nope`.