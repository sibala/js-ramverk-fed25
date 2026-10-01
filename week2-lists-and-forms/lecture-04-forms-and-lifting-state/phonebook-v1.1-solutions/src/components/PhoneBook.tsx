/**
 * Exercise: Phonebook (version 1)
 *
 * We keep building on this app: in lecture 4 you add a form, and in lecture 5 you style
 * and animate it. So write code you want to meet again on tuesday.
 *
 * Part 1: Generate the contact list (see "6.ListsAndKeys")
 * - Generate a list <ul> from the contacts array below, with the array method .map()
 * - Place the code for one contact <li> in a new child component, "Contact" (components/Contact.jsx)
 * - Show the name and the phone number. Use the classes .contact-name and .contact-phone
 * - Add a key to every contact. Which property should you use, and why not the index?
 * - Contact gets a props type: type ContactProps = { contact: Contact, ... }
 *
 * Part 2: Conditional className (see "3.ConditionalRendering")
 * - Business contacts get the className "business"
 * - A contact can be BOTH business and favorite. How do you combine two class names?
 *
 * Part 3: Delete contact
 * - Add a Delete button to each contact
 * - Create a function deleteContact(id) in PhoneBook that removes the contact, using .filter()
 *
 * Part 4 (hard): Filter buttons
 * - Add the buttons: All, Personal, Business, Favorites
 * - Store the selected filter in a state
 * - Show only the contacts that match. Do you need a new state for the filtered list? (Hint: no!)
 * - Show "Showing 2 of 5 contacts" above the list
 *
 * Part 5: (Extra exercise added during lecture) Contacts in state + favorite button (see "7.StateWithArraysAndObjects")
 * - Add a checbox to each contact
 * - Create a function toggleFavorite(id) in PhoneBook. It flips "isFavorite" for the contact with that id
 *   Remember: don't mutate! Use .map() and the spread operator to create a NEW array
 * 
 * Part 6: (Extra exercise added during lecture) Create a sub component Contact.tsx (see "7.StateWithArraysAndObjects" -> ShoppingList.tsx and Product.tsx )
 * - Refactores out the <li></li> inside of the list (inside .map()), to a sub component Contact.tsx
 * - Contact gets a props type: type ContactProps = { contact: Contact, ... }
 * - Send down needed props from parent to the newly created sub component Contact.tsx, both values and functions
 *
 * Next time: there is no way to ADD a contact yet, only to change the five that are here.
 * That needs a form, which is lecture 4. Editing a contact is a form too, so that waits as well.
 *
 * NOTE! Think about WHERE each state should live. Which components need it?
 * NOTE! The Contact and Filter types are in src/types.ts, so every component can import them
 */

import { useState } from 'react';
import type { Contact } from '../types'

const initialContacts: Contact[] = [
  { id: 1, name: 'John Doe', phone: '123-456-7890', type: 'personal', isFavorite: false },
  { id: 2, name: 'Jane Smith', phone: '234-567-8901', type: 'business', isFavorite: false },
  { id: 3, name: 'Bob Johnson', phone: '345-678-9012', type: 'personal', isFavorite: true },
  { id: 4, name: 'Alice Brown', phone: '456-789-0123', type: 'business', isFavorite: true },
  { id: 5, name: 'Charlie Wilson', phone: '567-890-1234', type: 'personal', isFavorite: false },
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
          return (
            <li key={contact.id} className={`${contact.type === 'business' ? 'business' : ''} ${contact.isFavorite ? 'favorite' : ''}`}>
              <span className="contact-name">{contact.name}</span>
              <span className="contact-phone">{contact.phone}</span>
              <span className="contact-phone">{contact.type}</span>
              <span className="contact-phone">{contact.isFavorite && 'True'}</span>

              <input type="checkbox" checked={contact.isFavorite} onChange={() => toggleFavorite(contact.id)}/>
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default PhoneBook
