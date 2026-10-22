import { useEffect, useState } from 'react';
import PunList from './components/PunList'

/**
 * Exercise: Puns client v1 (API docs: https://pun-api-with-auth.vercel.app/docs)
 * You will keep building on this app in lectures 10, 11 and 12.
 *
 * Start by opening these in the browser to see what the API returns:
 *   https://pun-api-with-auth.vercel.app/api/puns
 *   https://pun-api-with-auth.vercel.app/api/puns/categories
 *   https://pun-api-with-auth.vercel.app/api/puns?category=food
 * NOTE! The API only answers web pages running on http://localhost:5173, 5174 or 5175 (CORS).
 * If Vite starts on another port, stop your other dev servers.
 *
 * Done for you: the Pun type (src/types.ts), API_URL (src/config.ts), PunItem, and
 * capitalize/formatDate (src/utils/format.ts)
 *
 * Part 1: Fetch on mount (see "14.UseEffectAndFetchingData/PostList")
 * - When the app loads, fetch the categories from /categories with a useEffect (empty dependency array)
 * - Store them in a state and show them as <option>s in the <select> below, after "All categories"
 * - An empty array can't be inferred, so tell useState what it will hold: useState<string[]>([])
 * - Remember: you can't make the effect function itself async. Create an async function INSIDE it and call it
 *
 * Part 2: Loading and error
 * - Show "Loading categories..." while fetching, and an error message if it fails
 * - Test the error: change the URL to a domain that doesn't exist
 *
 * Part 3: Fetch when something changes
 * - Make the <select> controlled with a state "category". '' means "all categories"
 * - In PunList: fetch the puns whenever the category changes (what goes in the dependency array?)
 *   ''     -> /api/puns
 *   'food' -> /api/puns?category=food
 * - Show each pun with <PunItem pun={pun} />, and "Loading puns..." while loading
 *
 * Part 4 (extra hard): Pun of the moment
 * - A new component PunOfTheMoment that gets the puns as a prop, and shows ONE of them in a box above the list
 * - Every 10 seconds it switches to another random pun (setInterval in an effect)
 * - Stop the timer in the cleanup (see "14.UseEffectAndFetchingData/Clock"). What happens if you forget it?
 *   (Hint: change category a few times and add a console.log in the interval)
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

      <label htmlFor="category">Category </label>
      <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All categories</option>
        {
          categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))

        }
      </select>

      <PunList category={category} />
    </main>
  )
}

export default App
