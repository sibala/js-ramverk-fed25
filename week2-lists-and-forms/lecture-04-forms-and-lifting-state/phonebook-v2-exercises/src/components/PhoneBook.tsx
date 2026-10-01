/**
 * Exercise: Phonebook, version 2 (forms)
 *
 * This is the SOLUTION from lecture 3. Everything below already works, and you keep building
 * on it. Today the app gets what it has been missing: a way to add a contact.
 *
 * Focus on the LOGIC today. We style and animate this exact app in lecture 5.
 *
 * Part 1: A form for adding contacts (see "8.Forms/RegisterForm")
 * - Create a new child component, "ContactForm" (components/ContactForm.tsx)
 * - A contact has four fields, so use ONE state object, not four states:
 *     const [form, setForm] = useState({ name: '', phone: '', type: 'personal', isFavorite: false })
 * - Write ONE handleChange for all of them. Give every field a name={...} that matches the state,
 *   and use a computed property name:  setForm({ ...form, [name]: value })
 * - The type field is a <select> with "personal" and "business"
 * - isFavorite is a <checkbox>. Careful: a checkbox has e.target.checked, not e.target.value
 * - Type the event so all three elements fit:
 *     ChangeEvent<HTMLInputElement | HTMLSelectElement>
 * - onSubmit on the <form>, and don't forget e.preventDefault()
 * - Every field needs a <label htmlFor="..."> that matches its id
 *
 * Part 2 (Hard): Validation
 * - A name is required, and so is a phone number
 * - Keep the messages in a state object:  const [errors, setErrors] = useState<Errors>({})
 * - Show the message under the field it belongs to, and only when there is one
 * - Remove a field's error as soon as the user starts typing in it
 *
 * Part 3: Send the new contact UP 
 * - The contacts array must stay in PhoneBook. ContactForm doesn't get to own it. Why not?
 * - PhoneBook passes down a function: addContact(newContact)
 * - ContactForm calls it on a valid submit, and then clears its own fields
 * - PhoneBook generates the id:  Math.floor(Math.random() * 1000000)
 *
 * Part 4: Move the filter buttons into a sibling
 * - The filter buttons are inline JSX in PhoneBook right now. Move them into their own
 *   component, "Filters" (components/Filters.tsx)
 * - EXPERIMENT FIRST: move the `filter` state into Filters as well, and look at what breaks.
 *   "Showing 2 of 5 contacts" and the list itself both stop working. Why?
 * - Then put the state back where it belongs, and pass `filter` and `setFilter` down
 * - Filters and the list are siblings, and both need the same value. That's the whole pattern
 *
 * NOTE! Think about WHERE each state should live. Which components need it?
 * NOTE! The Contact and Filter types are in src/types.ts, so every component can import them
 */

import { useState } from 'react';
import type { Contact as ContactType } from '../types'
import Contact from './Contact';

const initialContacts: ContactType[] = [
  { id: 1, name: 'John Doe', phone: '123-456-7890', type: 'personal', isFavorite: false },
  { id: 2, name: 'Jane Smith', phone: '234-567-8901', type: 'business', isFavorite: false },
  { id: 3, name: 'Bob Johnson', phone: '345-678-9012', type: 'personal', isFavorite: true },
  { id: 4, name: 'Alice Brown', phone: '456-789-0123', type: 'business', isFavorite: true },
  { id: 5, name: 'Charlie Wilson', phone: '567-890-1234', type: 'personal', isFavorite: false }
]


const PhoneBook = () => {

  const [contacts, setContacts] = useState(initialContacts)
  const [filter, setFilter] = useState('personal')


  const toggleFavorite = (id: number) => {

      // the state "contacts" is immutable => 
      // Not allowed to update directly. If updated is needed, then need to re-generate the whole value through setContacts
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === id) {
          return {
            ...contact,
            isFavorite: !contact.isFavorite
          }
        }
        
        return contact
      })

      setContacts(
        updatedContacts
      )

      // may refactor the above code with shorthand arrowfunctions and ternary operator
      // setContacts(contacts.map((contact => contact.id === id ? {...contact,isFavorite: !contact.isFavorite} : contact))
  }

  const deleteContact = (id: number) => {
    setContacts(
      contacts.filter(contact => contact.id != id)
    )
  }


  const filteredContacts = contacts.filter(contact => {
    if (filter === 'personal') {
      return contact.type === 'personal'
    }

    if (filter === 'business') {
      return contact.type === 'business'
    }

    if (filter === 'favorites') {
      return contact.isFavorite
    }
    
    return true
  })

  return (
    <section>
      <button onClick={()=> setFilter('all')}>All</button>
      <button onClick={()=> setFilter('personal')}>Personal</button>
      <button onClick={()=> setFilter('business')}>Business</button>
      <button onClick={()=> setFilter('favorites')}>Favorites</button>
      <p>Showing {filteredContacts.length} of {contacts.length} contacts</p>
      <ul>
        {
        filteredContacts.map(contact => {
          return <Contact key={contact.id} contact={contact} toggleFavorite={toggleFavorite} deleteContact={deleteContact} />
        })}
      </ul>
    </section>
  )
}

export default PhoneBook
