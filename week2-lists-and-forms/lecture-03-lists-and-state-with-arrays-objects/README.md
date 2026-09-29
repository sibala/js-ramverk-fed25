# Lecture 3 – Lists and state with arrays/objects


## Video links
- [01 - Post with comments solution part 1](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20260929%5F091159%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Eee0abfc0%2D9c5e%2D4b75%2D89f7%2Db2a70086cffe)
- [02 - Post with comments solution part 2](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20260929%5F101104%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ec0ff5a7d%2Dfbb2%2D41bd%2D8c7c%2D99a50b33c9c8)
- [03 - JS refreshers](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20260929%5F103628%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ec627e91a%2Df031%2D421a%2Dad0d%2Dcdf032f585be)
- [04 - Lists and Keys](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20260929%5F111344%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E80b4fe4f%2Df07a%2D4f5d%2D801b%2Da4122bc0a063)
- [05 - Handle Create, Read, Delete with State](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20260929%5F113115%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E43721d14%2Df6e6%2D4456%2Db9b3%2D31de343688d2)


## Goals

After this lecture you can:

- render lists from data with `.map()`
- filter lists with `.filter()` before rendering
- add, remove and update items in array state **without mutating** it
- update objects (and nested objects) in state with the spread operator

## 1. Solution to the previous exercise

Go through `post-with-comment-solution` from lecture 2.

## 2. JavaScript refreshers

Study the code in `js-refreshers/js-destructuring`, `js-refreshers/js-array-methods` and `js-refreshers/js-spread-operator`.

## 3. Study the code

In the app **`react-lectures`**, study:

- `6.ListsAndKeys/Blog.tsx`: Version 1 (index as key, wrong) → Version 4 (`.filter().map()` directly in JSX)
- `7.StateWithArraysAndObjects/`
  - `ShoppingList.tsx`: add with spread, remove with `.filter()`, toggle with `.map()`, and a derived counter

## 4. Exercise: Phonebook, version 1

Folder: `phonebook-v1-exercise`

Generate a contact list, then add favorites, conditional classes, delete and filter buttons, all by updating state immutably. All instructions are in `src/components/PhoneBook.tsx`.

This app comes back twice: in lecture 4 you give it a form, and in lecture 5 you style and animate it. So write code you want to meet again.

## 5. Reading instructions

- [Destructuring (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
- [Array .map() (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array .filter() (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Spread syntax (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Rendering lists](https://react.dev/learn/rendering-lists)
- [Updating objects in state](https://react.dev/learn/updating-objects-in-state)
- [Updating arrays in state](https://react.dev/learn/updating-arrays-in-state)
