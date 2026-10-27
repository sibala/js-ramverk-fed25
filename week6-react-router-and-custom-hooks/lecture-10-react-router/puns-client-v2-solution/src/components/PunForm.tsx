import { useState, type SubmitEvent } from "react";
import CategoriesDropdown from "./CategoriesDropdown";

type PunFormProps = {
  categories: string[]
  addPun: (content: string, category: string) => Promise<boolean>
}

// Part 1: make this a controlled form 
const PunForm = ({categories, addPun}: PunFormProps) => {
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await addPun(content, category)

    if (success) {
      setContent('')
      setCategory('')
    }
  }

  return (
    <form className="pun-form" onSubmit={handleSubmit}>
      <label>
        Your pun
        <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
      </label>
      <div className="row">
        <CategoriesDropdown 
          categories={categories} 
          category={category} 
          onChange={setCategory} 
          defaultOptions="Choose a category"
          htmlId="categories"
        />
        <button className="primary">Add pun</button>
      </div>
    </form>
  )
}

export default PunForm
