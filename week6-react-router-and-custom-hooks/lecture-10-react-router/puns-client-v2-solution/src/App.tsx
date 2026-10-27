import { useEffect, useState } from 'react';
import PunList from './components/PunList'
import CategoriesDropdown from './components/CategoriesDropdown';


/**
 * Exercise: Puns client v2. Writing data: POST, DELETE and PATCH
 * This is the solution from lecture 9. Now make it possible to add, delete and edit puns.
 * Use the same fetch pattern as "16.WritingData/NoteManager": method, headers and body.
 * API docs: https://pun-api-with-auth.vercel.app/docs
 *
 * NOTE! EVERYONE in the class uses the SAME API, and it has no login. Only delete and edit YOUR OWN puns.
 *
 * Part 1: POST
 * - Make PunForm a controlled form (lecture 4): a textarea for the content, and a select with the categories
 *   (pass the categories from App to PunList, and on to PunForm)
 * - Write addPun(content, category) in PunList, and pass it to PunForm. It sends:
 *   POST /api/puns   body: { "content": "...", "category": "food" }
 * - Add the pun the SERVER sends back to the puns state. Why that one, and not the form data? (Hint: _id and date)
 *
 * Part 2: DELETE
 * - Show a "Delete" button only on puns
 * - DELETE /api/puns/{id}. When the server says OK, remove the pun from the state
 *
 * Part 3: PATCH
 * - An "Edit" button on puns.
 * - PATCH /api/puns/{id}   body: { "content": "..." }
 * - Replace the pun in the state with the one the server sends back.
 *
 * Part 4: Messages and errors
 * - Show a message after every write: "✅ Pun added", "✅ Pun deleted", "✅ Pun updated"
 * - fetch does NOT throw on 400 or 404. Check response.ok, and show the server's message: data.message
 *   Test it: send an empty pun. What does the Network tab show?
 * - Network tab → "Offline", then try again. Now fetch DOES throw. Catch it and show a message
 */
function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [category, setCategory] = useState('')


  useEffect(() => {
    console.log('UseEffect Fetch Categories:  On Mount')

    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://pun-api-with-auth.vercel.app/api/puns/categories`)
        const data = await response.json()
        // console.log(data)

        setCategories(data)
      } catch(error) {
        console.log('error')
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])


  return (
    <main>
      <h1>😄 Puns</h1>


      {isLoading && <p>Loading categories...</p>}
      {error && <p className="error">Could not load the categories: ${error}</p>}

      <CategoriesDropdown
        categories={categories} 
        category={category} 
        onChange={setCategory} 
        defaultOptions="All Categories"
        htmlId="category-filter"
      />

      <PunList category={category} categories={categories} />
    </main>
  )
}

export default App
