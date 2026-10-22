# Lecture 10 – REST, error handling and writing data

## Video links
- [01 - coming soon...]()


## Goals

After this lecture you can:

- create, update and delete data with `POST`, `PATCH` and `DELETE`
- Controlled forms with API requests
- read status codes (2xx, 4xx, 5xx), and know that **`fetch` does not throw on 404 or 500**


## 1. Solution to the previous exercise

Go through `puns-client-v1-solution` from lecture 9. It's also the starting point for today's exercise.

## 2. Tools

| Tool | Install / run | Used for |
|---|---|---|
| A small Express API (`notes-api/server.js`, next to `react-lectures`) | In `notes-api`: `npm install`, then `npm run dev` | The code-along only: notes in an array in memory, on http://localhost:3001/notes. Restart it to get the original notes back |

## 3. Study the code

In the app **`react-lectures`** (start `notes-api` first, in a second terminal: `npm run dev`), study:

- `12.WritingData/`
  - `StatusCodes.tsx`: REST and status codes in a comment block. **Version 1** (no `response.ok` check) → **Version 2** (a message per kind of error). Click the buttons with the Network tab open
  - `NoteManager.tsx`: plain `fetch` calls for GET, POST, PATCH and DELETE, right in the component. Each one: `method`, `headers` and `body` → `response.json()` → check `response.ok` → update the state with what the **server** sent back, and show its message ("Note created")


## 4. Exercise: Puns client v2

Folder: `puns-client-v2-exercise` 

The puns client from lecture 9 learns to write: add puns with a form (POST), delete them (DELETE) and edit them (PATCH), with the same `fetch` pattern as `NoteManager`. Then show a message after every write, including the server's error messages and "no network". All instructions are in `src/App.tsx`.


## 5. Reading instructions

- [An overview of HTTP (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [HTTP response status codes (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [HTTP request methods (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
- [Response.ok (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
- [Using the Fetch API: supplying request options (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#setting_the_method)
- [Updating arrays in state](https://react.dev/learn/updating-arrays-in-state) (repetition)
