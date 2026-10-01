import { useState, type SubmitEvent } from 'react'

/**
 * A controlled input: React state is the "single source of truth".
 * 1. The input shows the value from state:   value={firstname}
 * 2. Every keystroke updates the state:      onChange={(e) => setFirstname(e.target.value)}
 *
 * Form events in TypeScript:
 *   SubmitEvent<HTMLFormElement>   on onSubmit
 *   ChangeEvent<HTMLInputElement> on onChange (not needed here: the inline handler is typed already)
 */
const FormWithHooksBasics = () => {
  const [firstName, setFirstName] = useState('Gunnar');
  const [lastName, setLastName] = useState('Bergström');

  
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    // Without this, the browser reloads the page on submit (try commenting it out!)
    e.preventDefault()
    alert(`Hello ${firstName} ${lastName}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Wrapping the input in a <label> connects them, so clicking the text focuses the input */}
      <label>
        Firstname:
        <input type="text" name="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      </label>

      <br />

      <label>
        Lastname:
        <input type="text" name="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>

      <br />

      <p>
        Live preview: {firstName} {lastName}
      </p>

      <button type="submit">Submit</button>
    </form>
  )
}

export default FormWithHooksBasics
