import { useEffect, useState } from "react";
import PunItem from "./PunItem";
import type { Pun } from "../types";
import PunOfTheMoment from "./PunOfTheMoment";
import PunForm from "./PunForm";


type PunListProps = {
  category: string
  categories: string[]
}

// Part 3: fetch and show the puns in one category
const PunList = ({category, categories}: PunListProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [puns, setPuns] = useState<Pun[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log('UseEffect Fetch Puns:  On Mount')

    const fetchPuns = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://pun-api-with-auth.vercel.app/api/puns?category=${category}`)
        const data = await response.json()
        console.log(data)

        setPuns(data)
      } catch(error) {
        console.log('error')
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPuns()
  }, [category])


  const addPun = async (content: string, category: string) => {
    setError('')
    setMessage('')
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
      setPuns([...puns, data])
      setMessage("✅ Pun added")
      return true
    } catch(error) {
      console.log('error')
      setError(error instanceof Error ? error.message : 'Unknown error')
      return false
    }
  }

  const deletePun = async (deleteID: string) => {
    setError('')
    setMessage('')
    try {
      const response = await fetch(`https://pun-api-with-auth.vercel.app/api/puns/${deleteID}`, {
        method: 'DELETE',
      })
      console.log(response)
      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return
      }
      setPuns(puns.filter(pun => pun._id !== deleteID))
      setMessage("✅ Pun deleted")
    } catch(error) {
      console.log(error)
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }


  const editPun = async (updatedPun: Pun) => {
    setError('')
    setMessage('')

    const content = window.prompt('Edit you pun: ', updatedPun.content)
    if (content === null) return
    try {
      const response = await fetch(`https://pun-api-with-auth.vercel.app/api/puns/${updatedPun._id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content})
      })
      console.log(response)
      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return
      }
      setPuns(puns.map(pun => pun._id === updatedPun._id ? data : pun))
      setMessage("✅ Pun updated")
    } catch(error) {
      console.log(error)
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  return (
    <section style={{marginTop: '20px'}}>

      {isLoading && <p>Loading puns...</p>}
      {error && <p className="error">Could not load the puns: {error}</p>}
      {message  && <p>{message}</p>}

      <PunForm categories={categories} addPun={addPun}/>

      {/* Lecture 9, part 4 */}
      <PunOfTheMoment puns={puns} />

      <ul className="puns">
        {
          puns.map(pun => (
            <PunItem key={pun._id} pun={pun} deletePun={deletePun} editPun={editPun}/>
          )) 
        }
      </ul>
    </section>
  )
}

export default PunList
