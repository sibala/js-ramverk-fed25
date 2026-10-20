# Lecture 8 – useEffect through fetching data

## Video links
- [01 - Lifecycle methods and UseEffect](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261020%5F090413%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E382d3623%2D708d%2D476e%2Db02a%2Dacac3ef795bb)
- [02 - Fetching with UseEffect](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261020%5F101132%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ef0826162%2D93bb%2D4866%2Daa49%2D844d8734087f)

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
- `PostList.tsx`: **Version 1 → 4**: an infinite loop → fetch on mount → fetch on update → Loading and error handling


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
