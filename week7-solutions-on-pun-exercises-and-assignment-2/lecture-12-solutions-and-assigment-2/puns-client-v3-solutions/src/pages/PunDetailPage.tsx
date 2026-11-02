import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Pun } from "../types";
import { capitalize, formatDate } from "../utils/format";

const PunDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [pun, setPun] = useState<Pun | null>(null)


  useEffect(() => {
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
  }, [id])


  const deletePun = async () => {
    if (!pun) {
      return
    }

    setError('')
    try {
      const response = await fetch(`https://pun-api-with-auth.vercel.app/api/puns/${pun._id}`, {
        method: 'DELETE',
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return
      }
      navigate('/')
    } catch(error) {
      console.log(error)
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }


  if (error) {
    return (
      <>
        <h1> {error || '404 – Page not found'}</h1>
        <Link to="/">Back to all puns</Link>
      </>
    )
  }

  if (!pun) {
    return (<p>Loading puns...</p>)
  }

  return (
    <article className="detail">
      {isLoading && <p>Loading puns...</p>}
      <p className="pun-content">{pun.content}</p>
      <p className="pun-meta">
        <span className="tag">{capitalize(pun.category || "")}</span>
        <span>{formatDate(pun.date || '')}</span>
      </p>

      <section className="actions">
        <Link to={`/puns/${pun._id}/edit`}>Edit</Link>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={deletePun}>Delete</button>
      </section>
    </article>
  )
}

export default PunDetailPage