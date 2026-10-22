import { useState } from 'react'

/**
 * REST: resources (nouns) in the URL, actions as HTTP methods
 *   GET    /posts      → list        POST   /posts     → create
 *   GET    /posts/1    → one         PATCH  /posts/1   → update part of it
 *   PUT    /posts/1    → replace     DELETE /posts/1   → delete
 *
 * Status codes: 2xx success, 3xx redirect, 4xx YOU did something wrong, 5xx the SERVER did
 *   200 OK · 201 Created · 204 No Content · 400 Bad Request · 401 Unauthorized
 *   403 Forbidden · 404 Not Found · 500 Internal Server Error
 *
 * IMPORTANT! fetch() only throws on NETWORK errors (no internet, wrong domain, CORS).
 * A 404 or 500 is a "successful" fetch. You must check response.ok yourself!
 */
type Request = {
  label: string
  url: string
}

const requests: Request[] = [
  { label: '200 OK', url: 'https://jsonplaceholder.typicode.com/posts/1' },
  { label: '404 Not Found', url: 'https://jsonplaceholder.typicode.com/posts/99999' },
  { label: 'Network error', url: 'https://this-domain-does-not-exist.example/posts' },
]

const StatusCodes = () => {
  const [result, setResult] = useState('')

  /**
   * Version 1: no response.ok check
   * The 404 "works", and we get an empty object instead of an error message
   */
  // const runRequest = async (url: string) => {
  //   try {
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     setResult(`Got data: ${JSON.stringify(data)}`)
  //   } catch (error) {
  //     setResult(`Caught: ${error.message}`)
  //   }
  // }

  /**
   * Version 2: check response.ok, and give each kind of error its own message
   */
  const runRequest = async (url: string) => {
    setResult('Loading...')
    try {
      const response = await fetch(url)

      if (!response.ok) {
        // Throw our own error, so it ends up in the catch below
        throw new Error(response.status === 404 ? 'Not found (404)' : `Server error (${response.status})`)
      }

      const data = await response.json()
      setResult(`${response.status}: ${data.title}`)
    } catch (error) { 
      if (error instanceof TypeError) setResult('Network error. Check your connection and the URL')
      else if (error instanceof Error) setResult(error.message)
      else setResult('Unknown error')
    }
  }

  return (
    <section>
      {requests.map((request) => (
        <div>
            <button key={request.label} onClick={() => runRequest(request.url)}>
            {request.label}
            </button>
        </div>
      ))}
      <p>{result}</p>
      <p>
        <small>Open the Network tab while you click. Look at the Status column and the Response tab.</small>
      </p>
    </section>
  )
}

export default StatusCodes
