import { useEffect, useState } from "react";
import PunItem from "./PunItem";
import type { Pun } from "../types";
import PunOfTheMoment from "./PunOfTheMoment";


type PunListProps = {
  category: string
}

// Part 3: fetch and show the puns in one category
const PunList = ({category}: PunListProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [puns, setPuns] = useState<Pun[]>([])

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

  return (
    <>

      {isLoading && <p>Loading puns...</p>}
      {error && <p className="error">Could not load the puns: ${error}</p>}


      <PunOfTheMoment puns={puns} />

      <ul className="puns">
        {
          puns.map(pun => (
            <PunItem key={pun._id} pun={pun} />
          )) 
        }
      </ul>
    </>
  )
}

export default PunList
