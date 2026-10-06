import { useState, type ChangeEvent, type SubmitEvent} from 'react'
import './formStyle.css' // Import a regular stylesheet

/**
 * CSS modules vs regular CSS
 *
 * CSS modules have local scope.
 * The same class name in two different CSS modules ends up as two different classes,
 * so you avoid conflicts between components.
 *
 * Try it: add a ".success" class with another color to a second regular stylesheet,
 * and import it in another component. Which one wins? Now try the same with CSS modules.
 */

/**
 * Four ways of styling React
 * 1. Regular stylesheets        import './style.css'           className="success"
 * 2. Inline styles               style={{ backgroundColor: 'beige' }}
 * 3. CSS modules                 import s from './x.module.css'  className={s.error}
 * 4. Utility classes (Tailwind)  className="rounded-lg bg-sky-500 p-4"   → see TailwindExample.jsx
 */

type User = {
  firstname: string
  lastname: string
  email: string
  comment: string
  country: string
  newsletter: boolean
}

const initialUser: User = {
  firstname: '',
  lastname: '',
  email: '',
  comment: '',
  country: 'IRQ',
  newsletter: false,
}
function RegisterFormWithStyling() {
  const [user, setUser] = useState(initialUser)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Error handling if no error set isSubmitted to true
    setIsSubmitted(true)
    alert(`Form was successfully submitted. Well done ${user.firstname}`)
    setUser(initialUser)
  }

  // Inline styling object. Note camelCase properties and string values
  const warningMessageStyle = {
    backgroundColor: 'beige',
    border: '1px double orange',
    color: '#5c3d00',
    padding: '10px',
    borderRadius: '5px',
  }

  return (
    <div id="register-form-wrapper">
      <h1>Register here with style!</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="messages">
          {/* 2. Inline styling */}
          <p style={warningMessageStyle}>Warning message (with inline style)</p>
          {/* 1. Class "success" from a regular stylesheet */}
          <p className="success">Success message (with regular stylesheet)</p>
          {/* 3. Class "error" from a CSS module */}
          {/* <p className={formStyle.error}>Error message (with CSS module)</p> */}
        </div>

        <label htmlFor="styled-firstname">First name</label>
        <input id="styled-firstname" type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />

        <label htmlFor="styled-email">Email</label>
        <input id="styled-email" type="email" name="email" value={user.email} onChange={handleInputChange} />

        <label htmlFor="styled-country">Country</label>
        <select id="styled-country" name="country" value={user.country} onChange={handleInputChange}>
          <option value="SE">Sweden</option>
          <option value="NO">Norway</option>
          <option value="FI">Finland</option>
        </select>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterFormWithStyling
