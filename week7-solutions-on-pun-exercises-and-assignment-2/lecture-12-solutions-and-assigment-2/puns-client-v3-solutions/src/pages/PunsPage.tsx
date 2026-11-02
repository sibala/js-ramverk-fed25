import { useEffect, useState } from 'react'
import CategoriesDropdown from '../components/CategoriesDropdown';
import PunList from '../components/PunList';

const PunsPage = () => {
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
      {isLoading && <p>Loading categories...</p>}
      {error && <p className="error">Could not load the categories: ${error}</p>}

      <CategoriesDropdown
        categories={categories} 
        category={category} 
        onChange={setCategory} 
        defaultOptions="All Categories"
        htmlId="category-filter"
      />

      <PunList category={category} />
    </main>
  )
}

export default PunsPage