import type { Contact } from "../types";

type ContactProps = {
  contact: Contact,
  toggleFavorite: (id: number) => void,
  deleteContact: (id: number) => void,
}

const Contact = ({contact, toggleFavorite, deleteContact}: ContactProps) => {
  console.log('Contact')
  return (
    <li className={`${contact.type === 'business' ? 'business' : ''} ${contact.isFavorite ? 'favorite' : ''}`}>
      <span className="contact-name">{contact.name}</span>
      <span className="contact-phone">{contact.phone}</span>
      <span className="contact-phone">{contact.type}</span>

      <input type="checkbox" checked={contact.isFavorite} onChange={() => toggleFavorite(contact.id)}/>
      <button onClick={() => deleteContact(contact.id)}>Delete</button>
    </li>
  )
}

export default Contact