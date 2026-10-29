# Lecture 11 – Custom hooks

## Video links

## Goals

After this lecture you can:

- explain what a custom hook is: a function whose name starts with `use`, that calls other hooks
- tell what belongs in a hook (stateful logic) and what belongs in a component (markup)
- explain that every call to a hook gets its **own** state
- follow the rules of hooks: only at the top level, never after an early return or inside a condition
- extract reusable logic into hooks like `useLocalStorage` and `useNotes`
- build a hook on top of another hook (`useNotes` on `useLocalStorage`)
- cancel old requests with `AbortController`


## 1. Study the code

In the app **`react-lectures`**, study `14.CustomHooks/`:

- `ThemeToggle.tsx` + `useLocalStorage.ts`: a first, simple custom hook (Version 1 → 2)
- `useNotes.ts` + `NoteManagerWithCustomHooks.tsx`: all the fetch logic from lecture 9 in one reusable hook, with `AbortController`

## 2. Exercise: Puns client v4

[puns-client-v4-exercises](puns-client-v4-exercises.md)

A **refactoring** exercise: the app should look and work the same afterwards, with less code in the components. Write `useLocalStorage` + `usePuns`.

## 3. Reading instructions

- [Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Rules of hooks](https://react.dev/reference/rules/rules-of-hooks)
- [Referencing values with refs](https://react.dev/learn/referencing-values-with-refs)
- [Avoiding recreating the initial state (lazy initialization)](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)
- [Window: localStorage (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [AbortController (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

