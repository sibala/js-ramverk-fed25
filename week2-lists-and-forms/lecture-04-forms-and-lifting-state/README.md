# Lecture 4 – Forms and lifting state up


## Goals

After this lecture you can:

- build controlled forms with inputs, textarea, select and checkbox
- handle many fields with one general `handleChange` and computed property names
- validate a form and show error messages
- decide which component should own a piece of state (the closest common parent)
- send data **down** with props and **up** with functions
- let sibling components share the same state
- type form events and function props: `(contact: NewContact) => void`

## 1. Solution to the previous exercise

Go through `phonebook-v1-solution` from lecture 3. It's also the starting point for today's exercise.

## 2. Study the code

In the app **`react-lectures`**, study:


- `7.StateWithArraysAndObjects/` Further build on pervious lecture with toggleDoneItem and refactor to a sub component Product.tsx
  - `ShoppingList.tsx`: 
  - `Product.tsx`: 
- `8.Forms/`
  - `FormWithHooksBasics.tsx`: controlled inputs and `preventDefault`
  - `RegisterForm.tsx`: one state object, one `handleChange` (Version 1 → 2), checkbox, select and validation.
    **This is the pattern the contact form needs**, because a contact has four fields

Also study `js-refreshers/js-spread-operator` again. You'll use it in every `handleChange`.

## 3. Exercise: Phonebook, version 2

Folder: `phonebook-v2-exercise`
<br />
See: [Phonebook-v2-in-React-Diagram.png](Phonebook-v2-in-React-Diagram.png) to get a visual on how the phonebook should be solved

The exercise folder already contains the finished app from lecture 3, so everyone starts from
working code. You add a `ContactForm` child with one state object and one `handleChange` across
text, `select` and `checkbox`, validation with accessible error messages, `addContact` passed down
from `PhoneBook`, the filter buttons moved out into a `Filters` sibling, and (hard) inline editing.
All instructions are in `src/components/PhoneBook.tsx`.

We style and animate **this exact app** in lecture 5.

### New types in `src/types.ts`

| Type | What it is | Why |
|---|---|---|
| `NewContact` | `Omit<Contact, 'id'>` | the form fills in everything except the id, which `PhoneBook` hands out |
| `Errors` | `Partial<Record<'name' \| 'phone', string>>` | one optional message per field; a valid field simply isn't in the object |

## 4. Reading instructions

- [Reacting to input with state](https://react.dev/learn/reacting-to-input-with-state)
- [The `<input>` component](https://react.dev/reference/react-dom/components/input)
- [Choosing the state structure](https://react.dev/learn/choosing-the-state-structure)
- [Sharing state between components](https://react.dev/learn/sharing-state-between-components)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Spread syntax (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
