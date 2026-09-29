# Lecture 3 – Lists and state with arrays/objects


## Video links
- [01 - ...]()
- [02 - ...]()
- [03 - ...]()


## Goals

After this lecture you can:

- render lists from data with `.map()`
- filter lists with `.filter()` before rendering
- add, remove and update items in array state **without mutating** it
- update objects (and nested objects) in state with the spread operator
- pass a function down as a prop, so a child can ask its parent to change the state

## 1. Solution to the previous exercise

Go through `post-with-comment-solution` from lecture 2.

## 2. JavaScript refreshers

Study the code in `js-refreshers/js-destructuring`, `js-refreshers/js-array-methods` and `js-refreshers/js-spread-operator`.

## 3. Study the code

In the app **`react-lectures`**, study:

- `6.ListsAndKeys/Blog.tsx`: Version 1 (index as key, wrong) → Version 4 (`.filter().map()` directly in JSX)
- `7.StateWithArraysAndObjects/`
  - `ShoppingList.tsx`: add with spread, remove with `.filter()`, toggle with `.map()`, and a derived counter
  - `ProfileEditor.tsx`: updating objects and nested objects

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
