# Puns client v4 – Custom hooks

> ⚠️ **Finish the v3 exercise first.** These exercises build on *your own* `puns-client-v3-exercise` from lecture 10. Start here only when your v3 works: the pages, the layout, CRUD and errorhandling

You don't need a new folder: **keep working in your own `puns-client-v3-exercise`**.

The app already works. Now you make the code cleaner by moving the fetch logic out of the pages into **custom hooks**, like `useNotes` and `useSaveNotes` in the code-along. Afterwards, the app should look and work exactly the same, with less code in the components.

**Code-along to look at:** `14.CustomHooks` in `react-lectures` (`ThemeToggle` + `useLocalStorage`, and `NoteManagerWithCustomHooks` + `useNotes` and `useSaveNotes`).

## Overview

| Part | Hook | Where it's used |
|---|---|---|
| 1 | `useLocalStorage` | `PunsPage` |
| 2 | `usePuns` | `PunList` |
| 3 | `usePun` and `useCategories` | `PunDetailPage`, `EditPunPage`, `PunsPage`, `NewPunPage` |
| 4 | `useSavePuns` | `NewPunPage`, `EditPunPage`, `PunDetailPage` |
| 5 (extra) | Cancel old answers in `usePuns` | `usePuns` |

You end up with two files in `src/hooks/`: `useLocalStorage.ts`, and `usePuns.ts` with all the pun hooks.


---

## Part 1: `useLocalStorage` – remember the chosen category

Reload the page: the category is back to "All categories". It would be nicer if it was remembered.

1. Create `src/hooks/useLocalStorage.ts`, like the one in the code-along (`ThemeToggle`). `useLocalStorage(key, initialValue)` returns `[value, setValue]`, just like `useState`:
    - read the saved value **once**: `useState(() => ...)` with `localStorage.getItem` and `JSON.parse`
    - save it every time it changes: a `useEffect` with `localStorage.setItem` and `JSON.stringify`
    - return `[value, setValue] as const`
2. In `PunsPage`, replace `useState('')` for the category:

    ```tsx
    const [category, setCategory] = useLocalStorage('category', '')
    ```

3. Reload: the category stays. Look in **DevTools → Application → Local Storage**.

---

## Part 2: `usePuns` – the list

Look at `PunList`: a `useEffect` and three `useState`s (`puns`, `isLoading`, `error`), only to GET the puns.

1. Create `src/hooks/usePuns.ts`, like `useNotes` in the code-along. `usePuns(category)` returns `{ puns, isLoading, error }`.
    - Move the `useState`s and the `useEffect` from `PunList` into the hook, with `[category]` as the dependency.
2. In `PunList`:

    ```tsx
    const { puns, isLoading, error } = usePuns(category)
    ```

> 💡 **All the pun hooks go in this one file** (Parts 2–4). Open `usePuns.ts`, and you see everything about puns.

---

## Part 3: `usePun` and `useCategories` – two more hooks for reading

`PunDetailPage` and `EditPunPage` show **one** pun. Should they call `usePuns` and get the whole list? No.

1. Add `usePun(id)` to `hooks/usePuns.ts`. It returns `{ pun, isLoading, error }`.
    - Put the API's message in `error`, so `/puns/abc` shows "Pun not found".
2. `PunsPage`, `NewPunPage` and `EditPunPage` all fetch the categories in the same `useEffect`. Add `useCategories()` to `hooks/usePuns.ts`. It returns `{ categories, error }`.
3. `EditPunPage` calls both hooks. Every call gets its **own** state.

---

## Part 4: `useSavePuns` – every write

Like `useSaveNotes` in the code-along, the writes get their own hook. Here it matters even more, because the pages that write (new, edit, the pun's page) don't show the list: they shouldn't GET it for nothing.

1. Add `useSavePuns()` to `hooks/usePuns.ts`. It returns `{ addPun, updatePun, deletePun, message }`.
    - Move the POST from `NewPunPage`, the PATCH from `EditPunPage` and the DELETE from `PunDetailPage`.
    - Each function tells the page if it worked: `addPun` returns the new pun (or `null`), the others `true`/`false`.
    - The **page** still decides what happens after: `navigate(...)` stays in the page, and so does `window.confirm`.

    ```tsx
    const { addPun, message } = useSavePuns()

    const handleSave = async (content: string, category: string) => {
      const pun = await addPun(content, category)
      if (pun) navigate(`/puns/${pun._id}`)
      return pun !== null
    }
    ```

2. Count the `useEffect`s and `fetch` calls in `pages/` and `components/`, before and after. Which `useEffect` is left, and why does it belong where it is?

---

## Part 5 (extra): Old answers

1. Open the Network tab, set throttling to **Slow 4G**, and switch category fast. Can an old answer arrive last and show the wrong puns?
2. Fix it in the cleanup of `usePuns`' `useEffect`: an `ignore` flag (lecture 9), or an [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) that cancels the old request.

---

## Done?

- [ ] The app looks and works the same as before
- [ ] The category is remembered after a reload
- [ ] No `fetch` calls left in `pages/` or `components/`
- [ ] The only `useEffect` left outside `hooks/` is the timer in `PunOfTheMoment`
