import { useEffect, useState } from 'react';
import PunList from './components/PunList'
import CategoriesDropdown from './components/CategoriesDropdown';

/**
 * Exercise: Puns client v3. Pages with React Router
 * This is the solution from lecture 10. Now split it into pages, each with its own URL.
 * react-router is already in package.json (run npm install if you haven't).
 * Code-along to look at: 12.ReactRouter in react-lectures
 *
 * Part 1: Routes and a layout
 * - Create pages/PunsPage.tsx and move everything this App component shows into it (the categories and the list)
 * - Create pages/RootLayout.tsx: a header with the logo, and a <nav> with two NavLinks:
 *   "All puns" (to "/", with end) and "Add a pun" (to "/puns/new"). Under it: <main><Outlet /></main>
 * - Create pages/NotFoundPage.tsx: "404 – Page not found" and a Link back to "/"
 * - In App: createBrowserRouter with a layout route ("/" → RootLayout) and its children:
 *   index → PunsPage, "*" → NotFoundPage. App only returns <RouterProvider router={router} />
 *   Write the routes like the docs: { index: true, Component: PunsPage }
 *
 * Part 2: Add a pun on its own page
 * - Create pages/NewPunPage.tsx, and add the route "puns/new"
 * - Move PunForm and the POST (addPun) from PunList to the new page. PunForm needs the categories, so the page fetches them
 * - After a successful POST: go to the new pun's page with useNavigate: navigate(`/puns/${data._id}`)
 *   (the page doesn't exist yet: you get the 404 page until Part 3 is done)
 *
 * Part 3: One pun per page (a dynamic route)
 * - Create pages/PunDetailPage.tsx, and add the route "puns/:id"
 * - Read the id with useParams(), and fetch that one pun: GET /api/puns/:id (in a useEffect, with [id])
 * - Show the pun's content, category and date
 * - In PunItem: make the pun's text a <Link> to its own page: to={`/puns/${pun._id}`}
 *
 * Part 4: Pun not found
 * - Go to /puns/abc. What does the API answer? (Network tab)
 * - Check response.ok: show the server's message ("Pun not found") and a Link back to "/"
 *
 * Part 5: Delete on the pun's page
 * - Move Delete from PunItem to PunDetailPage. After a successful DELETE: navigate('/')
 * - Add a "Go back" button: navigate(-1)
 * - The list doesn't need Edit or Delete any more: PunList only shows the puns
 *
 * Part 6 (extra): An edit page
 * - The route "puns/:id/edit", and an "Edit" Link on the pun's page
 * - Reuse PunForm, filled in with the pun. Hint: new props like initialContent, initialCategory and submitLabel
 * - Save with PATCH, then go back to the pun's page
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
