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
import type { Product as ProductType } from "./types"; // Rename/Give a new Alias to the type Product (E.g ProductType), so that it wont collide with the sub component Product
import Product from "./Product";



const initialItems: ProductType[] = [
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

        // When updating Croissant to done from "false" to  "true", the item object is generated
        // {
        //   id: '4',
        //   name: 'Croissant', 
        //   done: false
        //   done: !false // meaning true. The latter done will override the previous done. The end item object is below
        // }

        // The end item object
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
            <Product key={item.id} product={item} toggleDone={toggleDoneItem} removeItem={removeItem} />
          )
        })}
      </ul>

      <button onClick={addItem}>Add item</button>
    </section>
  )
}

export default ShoppingList
