import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import type { NewContact } from '../types';



const initialContact: NewContact = { name: '', phone: '', type: 'personal', isFavorite: false }

// One optional error message per field. Partial<> makes every key optional,
// and Record<'name | phone', string> means 'name | phone', with string values"
type Errors = Partial<Record<'name | phone', string>>

// The about type Errors =.... is equivalent to the following
// type Errors = {
//   name?: string
//   phone?: string
// }


type ContactFormProps = {
  addContact: (newContact: NewContact) => void
}

const ContactForm = ({addContact}: ContactFormProps ) => {
  console.log('ContactForm')
  const [form, setForm] = useState(initialContact)
  const [errors, setErrors] = useState<Errors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const fieldName = e.target.name
    setForm({
      ...form,
      [fieldName]:e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value
    })
  }

  const validateForm = () => {
    // HINTS for assignment 1 - portfolio
    // Validate the 2 fields here
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Run validation: validateForm()
    // If error, stop executing

    
    // Else addContact and display successMessage
    console.log('ContactForm -> handleSubmit')
    addContact(form)
    setForm(initialContact)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Contact</h2>

      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" value={form.name} onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="phone">Phone: </label>
        <input type="text" id="phone" name="phone" value={form.phone} onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="type">Type: </label>
        <select id="type" name="type" value={form.type} onChange={handleChange}>
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div>
        <label htmlFor="favorite">
          <input type="checkbox" id="favorite" name="isFavorite" checked={form.isFavorite} onChange={handleChange}/>Favorite
        </label>
      </div>
      
      <div>
        <button>Add Contact</button>
      </div>


      <code>{JSON.stringify(form)}</code>
    </form>
  )
}

export default ContactForm