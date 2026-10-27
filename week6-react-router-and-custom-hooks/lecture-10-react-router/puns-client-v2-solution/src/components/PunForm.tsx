import { useState, type SubmitEvent } from "react";

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
        <label htmlFor="category">Category 
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Choose a category</option>
            {
              categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))
            }
          </select>
        </label>
        <button className="primary">Add pun</button>
      </div>
    </form>
  )
}

export default PunForm
