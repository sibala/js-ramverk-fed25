/**
 * Updating arrays in state
 *
 * State must be treated as READ-ONLY. Never change it directly:
 *   items.push(newItem)      React won't re-render
 *   items[0].done = true     React won't re-render
 *
 * Instead, create a NEW array and pass it to the setter:
 *   add:     [...items, newItem]
 *   remove:  items.filter(item => item.id !== id)
 *   update:  items.map(item => item.id === id ? { ...item, done: !item.done } : item)
 *
 * The second idea in this file: PASSING A FUNCTION DOWN AS A PROP.
 *   Version 1: everything in one component, the whole <li> written inline
 *   Version 2: one product = one child component, and the parent hands it the functions
 */

import { useState } from "react";


type Product = {
  id: string
  name: string
  done: boolean
}

const initialItems: Product[] = [
  { id: '1', name: 'Milk', done: false },
  { id: '2', name: 'Bread', done: true },
  { id: '3', name: 'Coffee', done: false },
  { id: '4', name: 'Croissant', done: true },
]

const ShoppingList = () => {
  const [items, setItems] = useState(initialItems)

  const addItem = () => {
    setItems([
      ...items, // Spread operator
      { id: '5', name: 'Oat Milk', done: false } // The new Item
    ])
  }


  const toggleDoneItem = (id: string) => {
    
    let updatedItems = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          done : !item.done,
        }

        // {
        //   id: '4',
        //   name: 'Croissant', 
        //   done: false
        //   done: !false // meaning true
        // }

        // {
        //   id: '4',
        //   name: 'Croissant', 
        //   done: true
        // }
      }
      return item
    })

    setItems(
      updatedItems
    )
  }

  const removeItem = (id: string) => {
    setItems(
      items.filter(item => item.id != id)
    )
  }




  /**
   * Version 1: one component does everything
   */
  return (
    <section>
      <h1>Shopping List</h1>

      <ul>
        { items.map(item => {
          return (
            <li key={item.id}>
              {/* <input type="checkbox" checked={item.done} /> */}
              <label>{item.name}</label>
              <input type="checkbox" checked={item.done} onChange={() => toggleDoneItem(item.id)}/>
              <button onClick={() => removeItem(item.id)}>Delete</button>
            </li>
          )
        })}
      </ul>

      <button onClick={addItem}>Add item</button>
    </section>
  )
}

export default ShoppingList
