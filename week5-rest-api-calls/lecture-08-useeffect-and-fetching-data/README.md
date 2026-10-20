# Lecture 8 – useEffect through fetching data

## Video links


## Goals

After this lecture you can:

- explain what a side effect is, and why fetching data can't happen directly in the component body
- describe a component's lifecycle: **mount → update → unmount**
- fetch data with `fetch` + `async`/`await` inside `useEffect`
- control when an effect runs with the dependency array: `[]`, `[userId]`
- handle the three states of every request: **loading, error and data**
- prevent race conditions with a cleanup function
- describe what an API returns with a type, since `response.json()` gives you `any`
- handle `catch (error)`, which is `unknown` in strict TypeScript

## 1. JavaScript refreshers

Study the code in `js-refreshers/js-setInterval`.

## 2. Study the code

In the app **`react-lectures`**, study `11.UseEffectAndFetchingData/`:

- `Clock.tsx`: cleanup in its simplest form (a timer that must be stopped)
- `HooksExample.tsx` (extra): `document.title` and several effects in one component
- `PostList.tsx`: **Version 1 → 4**: an infinite loop → fetch on mount → fetch on update → cleanup against race conditions


## 3. Exercise: Puns client v1

Folder: `puns-client-v1-exercise` 
All instructions are in `src/App.tsx`.
API: the **Pun API**, [documentation](https://pun-api-with-auth.vercel.app/docs). Open these in the browser to see what it returns:

- https://pun-api-with-auth.vercel.app/api/puns/categories
- https://pun-api-with-auth.vercel.app/api/puns?category=food

> **NOTE!** The API only answers web pages running on `http://localhost:5173`, `5174` or `5175` (CORS). If Vite starts on another port, stop your other dev servers. The browser address bar, Postman and curl work from anywhere.


## 4. Reading instructions

- [async function (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Using the Fetch API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Synchronizing with effects](https://react.dev/learn/synchronizing-with-effects)
- [Lifecycle of reactive effects](https://react.dev/learn/lifecycle-of-reactive-effects)
- [You might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)
