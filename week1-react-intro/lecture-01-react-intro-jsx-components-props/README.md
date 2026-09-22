# Lecture 1 – React intro, JSX, components and props

## Video links
- [01 - Course intro, Getting started with React, JSX part 1](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20260922%5F090336%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Efb633189%2D90e5%2D49e6%2D9a8c%2D3bd8f09a3c23)
- [02 - JSX part 2](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20260922%5F101116%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ef251fef0%2D585c%2D40e6%2D9bc5%2D1d0491591755)
- [03 - Components and Props](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20260922%5F105625%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E6b23d954%2D4605%2D49dd%2Dbd51%2D12a823279121)

## Goals

After this lecture you can:
- create and run a React project with Vite
- write JSX, and know the rules that differ from HTML
- split a page into function components and import/export them
- pass data to components with props
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

- [basic-layout-exercise.pdf](basic-layout-exercise.pdf)
Build the layout in the picture, with **one component per section** and a **Navigation component that is reused** in both the header and the sidebar.


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

