# Lecture 5 – Styling


## Video links
- [01 - Phonebook v2 solutions part 1](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261006%5F090451%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E4aa9cb25%2D959d%2D4ab3%2D823f%2D16ff60d8384b)
- [02 - Phonebook v2 solutions part 2](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261006%5F100125%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E992406e7%2D84cf%2D45cb%2D869c%2D8359d67a9400)
- [03 - Inline vs Regular CSS vs Module CSS vs Tailwind](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261006%5F110201%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ed3dbd874%2Dad13%2D478b%2Db0e3%2Dac4f420ff75e)
- [04 - Present assignment 1 - portfolio](https://medieinstitutet.sharepoint.com/sites/FED25D/_layouts/15/stream.aspx?id=%2Fsites%2FFED25D%2FDelade%20dokument%2F09%20JavaScript%20Ramverk%2FRecordings%2FJavaScript%20Ramverk%2D20261006%5F113826%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E9995193d%2D0868%2D457e%2D8f04%2D04ba031cd5a8)

## Goals

After this lecture you can style React with 
- regular CSS, 
- inline styles, 
- CSS modules
- Tailwind CSS, and choose between them


## 1. Solution to the previous exercise

Go through `phonebook-v2-solution` from lecture 4.

## 2. Packages
- Tailwind CSS: `npm install tailwindcss @tailwindcss/vite` 

Tailwind setup in a Vite project: add `tailwindcss()` to the plugins in `vite.config.js`, and write `@import "tailwindcss";` at the top of `index.css`. See the comment in `TailwindExample.tsx`.

## 3. Study the code

In the app **`react-lectures`**, study:

- `9.Styling/`
  - `RegisterFormWithStyling.tsx`: regular CSS vs. inline styles vs. CSS modules
  - `TailwindExample.tsx`: Tailwind utility classes, responsive design


## 4. Assignment 1 - Portfolio
- Start working on the portfolio assignment found in itslearning


## 5. Reading instructions
- [CSS modules in Vite](https://vite.dev/guide/features#css-modules)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Using CSS transitions (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
