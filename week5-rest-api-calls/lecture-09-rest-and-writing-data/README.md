# Lecture 10 – REST, error handling and writing data

## Video links
- [01 - puns-client-v1-solutions part 1](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261022%5F090527%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E8e5ed240%2D04d5%2D48d0%2D8cf0%2Db6ecf73609b2)
- [02 - puns-client-v1-solutions part 2](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261022%5F100051%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E0bc06cb4%2Da6d9%2D4531%2Db768%2D2310431c4820)
- [03 - puns-client-v1-solutions part 3 (solved part 4)](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261022%5F110605%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ec3877ac5%2Da585%2D4a99%2Dbfdb%2Df6386a327e15)
- [04 - CRUD and error handling](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261022%5F112242%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E29be5ee4%2D1a3c%2D4221%2D9d38%2Dd468cba8ed66)

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
