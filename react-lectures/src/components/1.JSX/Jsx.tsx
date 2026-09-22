// Creating a function component with the snippet "rafce" (ES7+ React/Redux/React-Native snippets extension)
// Since some versions back, whe dont need to import React from 'react', to write Jsx

type User = {
  firstname: string,
  lastname: string
}

const user: User = {
  firstname: 'John',
  lastname: 'Doe'
}

const element = <h1> Hello {user.firstname} {user.lastname} </h1>



const getGreeting = (user: User | null = null) => {
  if (user) {
    console.log(user)
    return <h2> Hello {user.firstname} </h2>
  }

  return <h2> Hello stranger </h2>
}


const fruits: string[] = ['Apple', 'Banana', 'Cherry']


/**
 * General rules and considerations when working with JSX
 * - To return multiple elements from a component, wrap them in a single parent tag, e.g. an extra <div>
 * - If you don't want an extra <div> in your markup, write <> and </> instead. This is called a Fragment
 * - JSX requires tags to be explicitly closed: self-closing tags like <img> must become <img />
 * - Many HTML and SVG attributes are written in camelCase. So it's onClick instead of onclick
 * - `class` is a reserved word in JS. In React you write "className" instead of "class"
 * - `for` is also reserved. On a <label> you write "htmlFor" instead
 * - Inline styles are objects, not strings: style={{ color: 'hotpink', fontSize: '2rem' }}
 * - Inside {} you can write any JavaScript *expression* (a value), but not statements like if or for
 * - JSX prevents injection attacks: it is safe to embed user input, because React escapes it
 *
 * TypeScript checks JSX too. Try these, and read the red squiggly lines:
 * - <p class="x">          → Property 'class' does not exist. Did you mean 'className'?
 * - style={{ colr: 'red' }} → 'colr' does not exist ... Did you mean to write 'color'?
 * - {user.age}              → Property 'age' does not exist on type 'User'
 */
const Jsx = () => {
  return (
    <>
      {/* Display plain text with JS */}
      <div className="">Hello {user.firstname}</div>

       {/* Display an element through a variable */}
      { element }

      {/* Display element through a function call */}
      { getGreeting(user) }


      {/* Display elements through .map */}
      <ul>
        {fruits.map( fruit => {
          return <li key={fruit}>{fruit}</li>
        })}
      </ul>
    </>
  )
}

export default Jsx