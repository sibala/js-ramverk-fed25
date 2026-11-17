---
marp: true
paginate: true
title: Lecture 17 – JS frameworks and Next.js
---

# Lecture 13

## JS frameworks, and the road to Next.js


---

## Today

1. Library or framework?
2. React, Vue, Angular and Next.js
3. Where does the code run?
4. What you bring from **React** (part 1–2)
5. Your pun app, in Next.js

---

# 1. Library or framework?

---

## Who is in charge?

**Library:** you call it, when you want

```js
const sorted = _.sortBy(users, 'name')   // you decide
```

**Framework:** it calls your code, at the right time

```js
// Next.js finds this file, and calls it for /products
export default function ProductsPage() { ... }
```

> A framework gives you a structure to fill in

---

## React is a library

React only does one thing: **UI from state**

Everything else, you picked yourself:

| Need | What we used |
|---|---|
| Build tool | Vite |
| Routing | React Router |
| Data | `fetch` in `useEffect`, custom hooks |
| Backend | a separate Express API |

---

# 2. Four names you will hear

---

## The landscape

| | Type | By | Write in |
|---|---|---|---|
| **React** | UI library: the community makes the rest | Meta | JSX, functions |
| **Vue** | UI library + official router and state (**progressive**) | Evan You + community | `.vue` files, templates |
| **Angular** | Everything included | Google | TypeScript, classes |
| **Next.js** | React **meta-framework** | Vercel | React + files and folders |

> React and Vue have almost the same core. The difference is **who makes the rest**

---

## Vue: a progressive framework

Use as much as you need, and add more when the app grows

1. **One widget** on an existing HTML page: a `<script>` tag, no build step
2. **Components** in `.vue` files, built with Vite
3. **A whole app** with the official router (Vue Router) and state (Pinia)
4. **Full-stack** with Nuxt, Vue's Next.js

React can also be added to one part of a page, but JSX usually needs a build step (Vite)

| | React | Vue |
|---|---|---|
| Router | React Router, TanStack Router... | Vue Router (official) |
| State | Context, Zustand, Redux... | Pinia (official) |
| Meta-framework | Next.js | Nuxt |

---

## The same counter: React

```tsx
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
}
```

- JavaScript first: the markup is **inside** JS (JSX)
- State with a hook

---

## The same counter: Vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template>
```

- HTML first: JS, template (and CSS) in one `.vue` file
- `count++` just works: Vue tracks changes for you (reactivity)

---

## The same counter: Angular

```ts
import { Component, signal } from '@angular/core'

@Component({
  selector: 'app-counter',
  template: `<button (click)="increment()">Clicked {{ count() }} times</button>`,
})
export class Counter {
  count = signal(0)
  increment() {
    this.count.update((n) => n + 1)
  }
}
```

- A class with a decorator, TypeScript from the start
- Router, forms, HTTP and testing are **included**

---

## Same idea, different style

All three have:

- **components**
- **state**, and the UI updates when it changes
- **props** / inputs down, **events** up
- a router, and a way to fetch data

> Learn one well, and the next one is mostly new syntax

**React and Vue** solve the same problem in a similar way. Vue makes its own router and state library and uses HTML templates. React leaves those choices to the community and uses JSX.

**Angular** is the one that is really different: classes, decorators, and everything included from the start

---

## How do they compare?

| | React | Vue | Angular |
|---|---|---|---|
| Size | small core | small core | everything included |
| Choices | many, you pick | some, official picks | few, decided for you |
| Learning curve | medium | gentle | steep |
| Common in | startups, product companies | agencies, Asia, Laravel projects | large companies, banks, gov |

---

## Why choose one over the other?

| Choose | When |
|---|---|
| **React** | you want the biggest job market and ecosystem, React Native for mobile, Next.js, and freedom to choose |
| **Vue** | you want fewer decisions and a gentle start, or to add it to an existing page with only a `<script>` tag |
| **Angular** | a large team needs everyone to write code the same way |

> Most often: **what the team already uses**. The ideas are the same, so switching takes days, not months

---

## Meta-frameworks

A framework **on top of** a UI library: routing, server rendering, and a backend

| UI library | Meta-framework |
|---|---|
| React | **Next.js**, React Router (framework mode) |
| Vue | Nuxt |
| Svelte | SvelteKit |
| Angular | built in (Angular SSR) |

> Next.js is not a replacement for React. It **is** React, plus the rest

---

## What Next.js adds to React

| You had to pick | Next.js has |
|---|---|
| Vite | its own build (Turbopack) |
| React Router | routes from **folders** in `app/` |
| `fetch` in `useEffect` | `await` in a **Server Component** |
| a separate Express API | Route Handlers and Server Actions, **in the same project** |
| a blank HTML page | HTML rendered on the server: fast and good for SEO |

---

# 3. Where does the code run?

---

## Before: two projects

```
Browser                               Server
┌──────────────────────────┐  fetch   ┌──────────────┐     ┌────────┐
│ React (Vite)             │ ───────▶ │ Express API  │ ──▶ │ MySQL  │
│ all React code runs here │ ◀─────── │              │     └────────┘
└──────────────────────────┘   JSON   └──────────────┘
```

This is **client-side rendering (CSR)**:

1. The browser gets an **empty** `<div id="root">` and a `<script>`
2. It downloads the JavaScript with **all** your components
3. React renders the page **in the browser**, then `useEffect` fetches the data

---

## Now: one project

```
Browser                       Next.js (server)
┌──────────────────┐          ┌──────────────────────┐     ┌────────┐
│ Client           │ ───────▶ │ Server Components    │ ──▶ │ MySQL  │
│ Components       │ ◀─────── │ Route Handlers       │     └────────┘
│ (useState, click)│   HTML   │ Server Actions       │
└──────────────────┘          └──────────────────────┘
```

This is **server-side rendering (SSR)**: the browser gets **finished HTML**, then React makes the buttons work

---

## Server or Client Component?

| Server Component (default) | Client Component (`"use client"`) |
|---|---|
| `async`, `await` data directly | `useState`, `useEffect` |
| reads the database and `process.env` | `onClick`, `onChange` |
| logs in the **terminal** | logs in the **browser** |
| sends no JS to the browser | its JS is sent to the browser |

> Server by default, `"use client"` as far down as possible

---

## "use client" as far down as possible

`"use client"` counts for the file **and everything it imports**

**Bad:** the whole page becomes client code, just for one `onClick`

```
page.tsx  "use client"            ← everything below is sent as JS
 ├── PunText
 ├── CategoryTag
 └── DeleteButton (onClick)
```

**Good:** only the button is client code

```
page.tsx                          ← Server: await the pun, finished HTML
 ├── PunText                      ← Server
 ├── CategoryTag                  ← Server
 └── DeleteButton  "use client"   ← only this is sent as JS
```

Less JS · data fetched with `await` · secrets stay on the server

---

# 4. What you bring from React

---

## Still exactly the same

- Components and **props**
- **JSX**: `{}` for JS, `className`, `map` with a `key`
- `useState`, controlled forms, lifting state up
- Conditional rendering: `&&` and `? :`
- TypeScript: types for props and data
- Custom hooks, `useLocalStorage`

> All of it works, inside a Client Component

---

## React Router → Next.js

| React Router | Next.js |
|---|---|
| `createBrowserRouter([...])` | folders under `app/` |
| `{ path: 'games/:id' }` | `app/games/[id]/page.tsx` |
| layout + `<Outlet />` | `layout.tsx` + `{children}` |
| `<Link to="/games">` | `<Link href="/games">` |
| `useParams()` | `params` prop, and `await` it |
| `useNavigate()` | `useRouter()` / `redirect()` |
| `path: '*'` | `not-found.tsx` |

---

## Loading and errors → files

What you wrote by hand in every page:

```tsx
if (isLoading) return <Loading />
if (error) return <ErrorMessage message={error} />
```

Next.js does it with files next to the page:

```
app/games/
  page.tsx       the page
  loading.tsx    shown while page.tsx waits for data
  error.tsx      shown when something throws
```

---

## Fetching: less code

**Before** (Client): state, effect, loading, error

```tsx
const [games, setGames] = useState<Game[]>([])
useEffect(() => {
  fetch(URL).then((r) => r.json()).then(setGames)
}, [])
```

**Now** (Server Component): just `await`

```tsx
export default async function GamesPage() {
  const games = await getGames()   // runs on the server
  return <GameList games={games} />
}
```

---

# 5. Your pun app, in Next.js

---

## puns-client-next

`puns-client-v3-solution`, moved to Next.js. Against the **same Pun API**

| v3 (React Router) | Next.js |
|---|---|
| `App.tsx` with `createBrowserRouter` | the folder tree in `app/` |
| `pages/PunDetailPage.tsx` | `app/puns/[id]/page.tsx` |
| `import { Link } from 'react-router'` | `import Link from 'next/link'` |
| `useNavigate()` | `useRouter()` from `next/navigation` |

The code **inside** the pages: the same `useState`, `useEffect` and `fetch`

---

## The same list, twice

| `/` | `/server-puns` |
|---|---|
| `"use client"` | a Server Component |
| `useEffect` + `fetch` | `await fetch(API_URL)` |
| `isLoading` in `useState` | `loading.tsx` |
| CORS decides | no CORS: server to server |
| *View page source*: empty | *View page source*: every pun |

---

## Next time: Express moves in

Lecture 18: the Pun API moves **into** the project

- Route Handlers instead of Express routes
- Postgres instead of MongoDB
- `_id: "6ad4..."` becomes `id: 3`

---

## Summary

- **React** is a library: UI from state. **Vue** and **Angular** solve the same problem in another style
- **Next.js** is React plus routing, server rendering and a backend
- From **React** you keep: components, props, state, JSX, forms, hooks
- Routes are **folders**: `page.tsx`, `layout.tsx`, `[id]`, `not-found.tsx`
- The new question in every file: **does this run on the server or in the browser?**

---

## Next

- Create an app: `npx create-next-app@latest`
- Code-along: `puns-client-next`, then `next-lectures/app/1-routing` and `app/2-server-vs-client`
- Exercise: **Board game library**
