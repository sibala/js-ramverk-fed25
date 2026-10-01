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
 * Next time: there is no way to ADD a contact yet, only to change the five that are here.
 * That needs a form, which is lecture 4. Editing a contact is a form too, so that waits as well.
 *
 * NOTE! Think about WHERE each state should live. Which components need it?
 * NOTE! The Contact and Filter types are in src/types.ts, so every component can import them
 */

import type { Contact } from '../types'

const initialContacts: Contact[] = [
  { id: 1, name: 'John Doe', phone: '123-456-7890', type: 'personal', isFavorite: false },
  { id: 2, name: 'Jane Smith', phone: '234-567-8901', type: 'business', isFavorite: false },
  { id: 3, name: 'Bob Johnson', phone: '345-678-9012', type: 'personal', isFavorite: true },
  { id: 4, name: 'Alice Brown', phone: '456-789-0123', type: 'business', isFavorite: false },
  { id: 5, name: 'Charlie Wilson', phone: '567-890-1234', type: 'personal', isFavorite: false },
]

const PhoneBook = () => {
  console.log(initialContacts)
  return <p>Start here!</p>
}

export default PhoneBook
