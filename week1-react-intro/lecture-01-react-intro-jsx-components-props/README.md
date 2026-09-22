# Lecture 1 – React intro, JSX, components and props

**Week 1 · Lecture 1** · Code-along: `1.JSX`, `2.ComponentsAndProps` · Exercise: **Basic layout**

## Goals

After this lecture you can:

- explain why we use a framework like React instead of manipulating the DOM by hand
- create and run a React project with Vite
- write JSX, and know the rules that differ from HTML
- split a page into function components and import/export them
- pass data to components with props, including `children`
- inspect components and props with React Developer Tools

## Before the lecture: tools

1. Install **Node.js** (LTS). Check the installation with `node --version`
2. Install the VS Code extension **[ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)**.
   Type `rafce` + Enter in a new file to get a component
3. Install **[React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)** in your browser.
   It adds a **Components** tab to DevTools

### Important commands

| Command | What it does |
|---|---|
| `npm create vite@latest` | Creates a new React app with Vite (choose **React** → **JavaScript**) |
| `ls` | Lists the files in the current folder. Make sure you see `package.json` before you run npm commands |
| `npm install` | Installs every package listed in `package.json` |
| `npm run dev` | Starts the app on http://localhost:5173 |
| `Ctrl + C` | Stops the app |

## 1. Study the code

In the app **`react-lectures`**, study the code in:

- `src/components/1.JSX/Jsx.jsx`: JSX in variables, functions and arrays, curly braces, and the JSX rules
- `src/components/2.ComponentsAndProps/`
  - `GreetingsComponent.jsx`: props, destructuring and default values
  - `comment/Comment.jsx`: refactoring one big component into `Avatar` and `UserInfo` (**Version 1 → 3**)
  - `Card.jsx`: the special `children` prop

Comment in the component you want to look at in `src/App.jsx`.

## 2. Exercise: Basic layout

Folder: `basic-layout-exercise` (solution: `basic-layout-solution`)

Build the layout in the picture, with **one component per section** and a **Navigation component that is reused** in both the header and the sidebar.
All instructions are in `src/App.jsx`.

![Basic layout](images/basic-layout.png)

```bash
cd basic-layout-exercise
npm install
npm run dev
```

## 3. Reading instructions

- [Quick start](https://react.dev/learn)
- [Vite: getting started](https://vite.dev/guide/)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Your first component](https://react.dev/learn/your-first-component)
- [Importing and exporting components](https://react.dev/learn/importing-and-exporting-components)
- [Writing markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [JavaScript in JSX with curly braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)
- [Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)

---

## Teacher notes

**Flow (≈ half day)**

1. *Why frameworks?* (~20 min): imperative DOM code vs. declarative UI. Show a short vanilla JS example that updates a list, then the React version. SPA vs. MPA, in brief. Mention the framework landscape (React, Vue, Svelte, Angular). It returns for the written exam (learning outcome 2)
2. *Tooling* (~15 min): `npm create vite@latest`, walk through the folder structure, `main.jsx` → `App.jsx`, `npm run dev`
3. *Code-along `1.JSX`* (~30 min): show `console.log(element)` to reveal that JSX is just an object. Go through the rules in the comment block, and let the students trigger the errors (missing closing tag, `class` instead of `className`)
4. *Code-along `2.ComponentsAndProps`* (~40 min): `GreetingsComponent` (Version 1 → 2), then `Comment` (Version 1 → 3). Open React DevTools after every refactor. End with `Card` and `children`
5. *AI tools in this course* (~10 min): what's allowed, and using AI as a tutor rather than a code generator
6. Exercise

**Common mistakes:** component names in lowercase (`<header />` renders the HTML element!), forgetting `export default`, `import Header from './header'` with the wrong case on case-sensitive systems, calling a component like a function.
