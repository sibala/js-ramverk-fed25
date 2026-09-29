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


type Product = {
  id: string
  name: string
  done: boolean
}

const initialItems: Product[] = [
  { id: '1', name: 'Milk', done: false },
  { id: '2', name: 'Bread', done: true },
  { id: '3', name: 'Coffee', done: false },
]

const ShoppingList = () => {

  /**
   * Version 1: one component does everything
   */



  /**
   * Version 2: the <li> moves into its own component, Product.tsx
   *
   * Product is a separate file. So we hand values and functions them over as props:
   */

}

export default ShoppingList
