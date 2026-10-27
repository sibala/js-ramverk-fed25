# Lecture 11 – React Router: pages, dynamic URLs and data

## Video links
- [01 - Recap slides apart 1](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261027%5F090543%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E00ccc7bf%2D1944%2D4cf6%2D94ab%2Ddcaf270998bd)(41 min)
- [02 - Recap slides apart 2](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261027%5F100106%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ed13ce125%2D688b%2D4868%2D91ff%2Dbc70bf632e7b)(9 min)
- [03 - Puns v2 Solutions part 1](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261027%5F101009%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ea3d88bdf%2Db029%2D48e6%2Dad9e%2D2f15c3037a5e)(39 min)
- [04 - Small refactoring exercise between lectures](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261027%5F110117%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E4c11c0d2%2Dd0e7%2D4aed%2D84a4%2D05e3e01548da)(6 min)
- [05 - Puns v2 Solutions part 2](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261027%5F112636%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E3ee2dba8%2Dd9c3%2D4451%2Da1df%2Dff83c011b853)(41 min)
- [06 - React Router intro with exercises Puns V3](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261027%5F130442%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E1a7febae%2Decf9%2D44b9%2D9aa7%2D5b52eaa86340)(70 min)


## Goals

After this lecture you can:

**React Router basics (the main part)**

- explain how a Single Page Application changes "page" without reloading
- set up React Router with `createBrowserRouter` and `RouterProvider`
- share a header and navigation between pages with a layout route and `<Outlet />`
- navigate with `<Link>` and `<NavLink>` (with active styling)
- create a dynamic route like `/puns/:id`, read the id with `useParams`, and show that one item
- handle unknown URLs with a 404 route, and an id that doesn't exist with a friendly message
- navigate from code with `useNavigate`, e.g. after a form is submitted

## 1. Recap slides: all concepts so far

Before anything new: a recap of every concept from lectures 1–10. Components, props, state, events, lists, forms, rendering, the lifecycle, `useEffect`, fetching and REST. Every concept is shown with code from **your puns client v2**, so you can see that you have already practised almost all of them.

Open `recap-slides.html` in a browser (double-click it, no install needed). ← → to navigate, **F** for fullscreen.

One colour per concept, on every slide: 🔵 component · 🟢 props · 🟠 state · 🔴 event handler · 🟣 effect.

## 2. Solution to the previous exercise

Go through `puns-client-v2-solution` from lecture 10. It's also the starting point for today's exercise.

## 3. How routing works

| Package | Install |
|---|---|
| React Router | `npm install react-router` |


A normal website loads a new HTML page for every URL. A **Single Page Application** loads **one** page, and React Router swaps components when the URL changes. No reload, so state and the layout stay.

You describe your pages in **one list of routes**: which URL shows which component.

| URL | Route | Shows |
|---|---|---|
| `/` | `{ index: true, element: <Home /> }` | the start page |
| `/notes` | `{ path: 'notes', element: <Notes /> }` | all notes |
| `/notes/new` | `{ path: 'notes/new', element: <NewNote /> }` | a form for a new note |
| `/notes/2` | `{ path: 'notes/:noteId', element: <NoteDetail /> }` | **one** note |
| `/notes/2/edit` | `{ path: 'notes/:noteId/edit', element: <EditNote /> }` | a form to change that note |
| `/anything-else` | `{ path: '*', element: <NotFound /> }` | a 404 page |

- **The layout route** is the template for every page: the header, navigation and footer that are the same everywhere. `<Outlet />` is the hole in the template where the current page is rendered
- **A dynamic route** has a part that changes: `:noteId`. One route works for every note. In the page, `useParams()` gives you that part of the URL (`'2'`), and you use it to fetch that one item: `GET /notes/2`. If the API answers 404, show "not found"
- **`<Link to="/notes">`** instead of `<a href>`: changes the URL without reloading the page. **`<NavLink>`** is a Link that knows if it's active, so you can style the current page
- **`useNavigate()`** navigates from code, e.g. to the new note's page after a POST, or back with `navigate(-1)`

In the puns client: `/` is the list, `/puns/new` the form, and `/puns/:id` one pun, found by its `_id`.

## 4. Study the code

In the app **`react-lectures`**:

**React Router basics,** `13.ReactRouter/`

The notes from lecture 10 get pages. It uses the same API, `notes-api`, which can now also fetch one note: `GET /notes/:id` (200, or 404 `{ "message": "Note not found" }`). Start it in a second terminal first: `npm run api` in `react-lectures-fed25`.

- `RouterExample.tsx`: the list of routes: a layout route, an index route, dynamic routes and `*`
- `pages/RootLayout.tsx`: the template: `NavLink`, the `end` prop and `<Outlet />`
- `pages/Notes.tsx`: GET all notes, and a `Link` to each note's own URL
- `pages/NoteDetail.tsx`: `useParams`, GET that one note, "Note not found" for `/notes/999`, and `useNavigate` after a DELETE
- `pages/NewNote.tsx`: a form page: POST, then navigate to the new note's URL (the server made the id)
- `pages/EditNote.tsx`: `/notes/:noteId/edit`: the form filled in with the note, PATCH, then back to the note


## 5. Exercise: Puns client v3

Folder: `puns-client-v3-exercise` 

Split the puns client into pages (list, detail, new, 404), load data with loaders, handle "pun not found", navigate after writes, show pending UI, and (hard) put the category in the URL so `/?category=food` can be shared. Extra hard: an edit page that reuses the form. All instructions are in `src/App.tsx`.

## 6. Reading instructions

**Basics**

- [Routing (React Router)](https://reactrouter.com/start/data/routing)
- [Navigating (React Router)](https://reactrouter.com/start/data/navigating)
- [useParams](https://reactrouter.com/api/hooks/useParams)
- [useNavigate](https://reactrouter.com/api/hooks/useNavigate)
- [Data loading (React Router)](https://reactrouter.com/start/data/data-loading)

