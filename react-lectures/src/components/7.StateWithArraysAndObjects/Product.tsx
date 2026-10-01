import type { Product } from "./types";



type ProductProps = {
  product: Product,
  toggleDone: (id: string) => void,
  removeItem: (id: string) => void,
}


const Product = ({product, toggleDone, removeItem}: ProductProps) => {
  return (
    <li>
      {/* <input type="checkbox" checked={item.done} /> */}
      <label>{product.name}</label>
      <input type="checkbox" checked={product.done} onChange={() => toggleDone(product.id)}/>
      <button onClick={() => removeItem(product.id)}>Delete</button>
    </li>
  )
}

export default Product