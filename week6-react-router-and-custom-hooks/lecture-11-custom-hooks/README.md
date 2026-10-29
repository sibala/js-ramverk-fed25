# Lecture 11 – Custom hooks

## Video links
- [01 - ThemeToggle with useLocalStorage part 1](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261029%5F090734%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Eef22205e%2Db803%2D4aba%2D89f6%2D0dfaad13b2ad)(43m)
- [02 - ThemeToggle with useLocalStorage part 2](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261029%5F101224%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Eba84be32%2Daebb%2D4898%2D91b0%2D2ac06f4b3e1b)(53m)
- [03 - Refactor Notemanager to useNotes. Present Puns V4 exercises](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261029%5F112112%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E25488a64%2D6f29%2D4e5d%2Dac0a%2Dcb7287ec446e)(41m)


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

