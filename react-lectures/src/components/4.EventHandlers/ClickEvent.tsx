import type { MouseEvent } from "react";

const ClickEvent = () => {

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('HandleClick ')
    console.log(e)
    console.log(e.currentTarget)
  }

  const sayHello = (name: string) => {
    alert('Hello ' + name)
  }


  const handleClickWithPreventDefault = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    console.log('handleClickWithPreventDefault')
  }


  return (
    <div>
      {/* 1. Pass a name to a function */}
      <button onClick={handleClick}>Click me</button>

      {/* 2. Inline arrow function with "e" */}
      <button onClick={(e) => { console.log(e.currentTarget)}}>Click me inline</button>

      {/* 3. passing arguments to the function */}
      <button onClick={() => sayHello("Alma")}> Say Hello</button>
      
      {/* 4. Common misstake binding a function with arguemnt to an event */}
      {/* <button onClick={sayHello("Alma")}> Say Hello</button> */}

      {/* 5. PreventDefault */}
      <p>
        <a href="https://google.se" onClick={handleClickWithPreventDefault}> CLick me with PreventDefault </a>
      </p>
    </div>
  )
}

export default ClickEvent