import { useEffect, useState } from 'react'
import PunForm from '../components/PunForm';
import { Link, useNavigate, useParams } from 'react-router';
import type { Pun } from '../types';

const EditPunPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [pun, setPun] = useState<Pun | null>(null)


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

    const fetchPun = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://pun-api-with-auth.vercel.app/api/puns/${id}`)
        const data = await response.json()
        // console.log(data)
        if (!response.ok) {
          setError(data.message)
        }

        setPun(data)
      } catch(error) {
        console.log('error')
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPun()
    fetchCategories()
  }, [id])

  const editPun = async (content: string, category: string) => {
    setError('')
    try {
      const response = await fetch(`https://pun-api-with-auth.vercel.app/api/puns/${id}`, {
        method: 'PATCH',
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

  if (!pun) {
    return (
      <>
        <h1> {error || 'Loading...'}</h1>
        <Link to="/">Back to all puns</Link>
      </>
    )
  }

  return (
    <div>
      {isLoading && <p>Loading categories...</p>}
      {error && <p className="error">Could not load the puns: {error}</p>}

      <PunForm 
        categories={categories} 
        onSave={editPun} 
        initialContent={pun.content}
        initialCategory={pun.category}
        submitLabel="Save pun"
      />
    </div>
  )
}

export default EditPunPage