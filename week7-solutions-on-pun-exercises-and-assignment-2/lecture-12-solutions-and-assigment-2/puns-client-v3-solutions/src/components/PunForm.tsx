import { useState, type SubmitEvent } from "react";
import CategoriesDropdown from "./CategoriesDropdown";

type PunFormProps = {
  categories: string[]
  onSave: (content: string, category: string) => Promise<boolean>
  initialContent?: string
  initialCategory?: string
  submitLabel?: string
}

// Part 1: make this a controlled form 
const PunForm = ({categories, onSave, initialContent = '', initialCategory = '', submitLabel = 'Add pun'}: PunFormProps) => {
  const [content, setContent] = useState(initialContent)
  const [category, setCategory] = useState(initialCategory)

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await onSave(content, category)

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
        <button className="primary">{submitLabel}</button>
      </div>
    </form>
  )
}

export default PunForm
