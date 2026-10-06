import { useState, type ChangeEvent, type SubmitEvent } from 'react'

type User = {
  firstname: string
  lastname: string
  email: string
  comment: string
  country: string
  newsletter: boolean
}

// One optional error message per field. Partial<> makes every key optional,
// and Record<keyof User, string> means "the keys of User, with string values"
type Errors = Partial<Record<keyof User, string>>

// The about type Errors =.... is equivalent to the following
// type Errors = {
//   firstname?: string
//   lastname?: string
//   email?: string
//   comment?: string
//   country?: string
//   newsletter?: string
// }


const initialUser: User = {
  firstname: '',
  lastname: '',
  email: '',
  comment: '',
  country: 'IRQ',
  newsletter: false,
}

/**
 * React is very controlling.
 * A controlled component is the standard way to handle HTML forms in React.
 * State keeps track of the initial values and every change the user makes.
 */
const RegisterForm = () => {
  const [user, setUser] = useState(initialUser);

  const [isSubmitted, setIsSubmitted] = useState(false)
  /**
   * Version 1: one handler per field. Lots of repetition!
  */
 
//  const [firstName, setFirstName] = useState('Gunnar');
//  const [lastName, setLastName] = useState('Bergström');
//  const [email, setEmail] = useState('Bergström');
//  const [comment, setComment] = useState('Bergström');
//  const [countries, setCountries] = useState('Bergström');
//  const [newsLetter, setNewsLetter] = useState('Bergström');


  // const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault()

  //   // Do some validation
  //   setFirstName(e.target.value)
  // }

  // handle functions repeated for all states 

  /**
   * Version 2: ONE general handler for all fields.
   * Uses the input's "name" attribute as the key: [fieldName] is a "computed property name".
   * The event type is a union, because the same handler is used on input, textarea and select.
   */

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const fieldName = e.target.name
    setUser({
      ...user,
      [fieldName]:e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value
    })
  }

  

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()


    // Error handling if no error set isSubmitted to true
    setIsSubmitted(true)

    alert(JSON.stringify(user))
    setUser(initialUser) // Reset after success
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Register here!</h1>

      {isSubmitted && <p className="success">Hurray, you are registered!!!!</p>}

      {/* htmlFor + id connects the label to the input (important for accessibility) */}
      <label htmlFor="firstname">Firstname:</label>
      <input id="firstname" type="text" name="firstname" value={user.firstname} onChange={(e) => handleChange(e)}/>

      <br />
      <label htmlFor="lastname">Lastname:</label>
      <input id="lastname" type="text" name="lastname" value={user.lastname} onChange={(e) => handleChange(e)}/>
      
      <br />
     
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" name="email" value={user.email} onChange={(e) => handleChange(e)}/>

      <br />
      <label htmlFor="comment">Comment:</label>
      <textarea id="comment" name="comment" value={user.comment} onChange={(e) => handleChange(e)}/>

      <br />
      <label htmlFor="country">Country:</label>
      <select id="country" name="country" value={user.country} onChange={(e) => handleChange(e)}>
        <option value="SE">Sweden</option>
        <option value="FI">Finland</option>
        <option value="NO">Norway</option>
        <option value="IRQ">Irak</option>
      </select>

      <br />
      <label>
        <input type="checkbox" name="newsletter" checked={user.newsletter} onChange={(e) => handleChange(e)}/>
        Send me the newsletter
      </label>

      <br />
      <button type="submit">Submit</button>

      {/* Debug: see the state update live */}
      <pre>{JSON.stringify(user, null, 1)}</pre>
    </form>
  )
}

export default RegisterForm
