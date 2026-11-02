import { useEffect, useState } from 'react'
import PunForm from '../components/PunForm';
import { useNavigate } from 'react-router';

const NewPunPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [error, setError] = useState('')
  const navigate = useNavigate()


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

  const addPun = async (content: string, category: string) => {
    setError('')
    try {
      const response = await fetch(`https://pun-api-with-auth.vercel.app/api/puns`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content, category})
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return false
      }
      navigate(`/puns/${data._id}`)
      return true
    } catch(error) {
      console.log('error')
      setError(error instanceof Error ? error.message : 'Unknown error')
      return false
    }
  }

  return (
    <div>
      {isLoading && <p>Loading categories...</p>}
      {error && <p className="error">Could not load the puns: {error}</p>}

      <PunForm categories={categories} onSave={addPun}/>
    </div>
  )
}

export default NewPunPage