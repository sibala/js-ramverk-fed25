/**
 * Fetching data is the most common reason to use useEffect.
 * The lifecycle of a component: MOUNT (first time on screen) → UPDATE (re-render) → UNMOUNT (removed)
 * 
 * `https://jsonplaceholder.typicode.com/users/${userId}/posts`
 */

import { option } from "motion/react-client";
import { useEffect, useState } from "react";

type Post = {
  id: number,
  title: string,
  body: string
}

type User = {
  id: number
  name: string
}

const users: User[] = [
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
]

const PostList = () => {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')



  /**
   * Version 1: fetch directly in the component body
   * fetch → setPosts → re-render → fetch → setPosts → re-render → ... an infinite loop!
   * (Don't run this for long. Check the Network tab, then comment it out again)
   */
  // fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
  //   .then(response =>response.json())
  //   .then(data => setPosts(data))



  /**
   * Version 2: useEffect with an EMPTY dependency array → runs once, on MOUNT
   * Problem: when you pick another user, nothing happens. Why?
   */
  // useEffect( () => {
  //   const fetchPosts = async () => {
  //     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
  //     const data = await response.json()
  //     setPosts(data)
  //   }

  //   fetchPosts();
  // }, []) // Ensures it only runs On Mount




 /**
   * Version 3: [userId] in the dependency array → runs on mount AND on UPDATE when userId changes
   */
  // useEffect( () => {
  //   const fetchPosts = async () => {
  //     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
  //     const data = await response.json()
  //     setPosts(data)
  //   }

  //   fetchPosts();
  // }, [userId]) // Ensures it runs On Mount AND when userId updates

  /**
   * Version 4: loading and error state. Every fetch needs these three: data, isLoading, error
   */
  useEffect( () => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        const data = await response.json()
        setPosts(data)
      } catch(error) {
        console.log('error')
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts();
  }, [userId]) // Ensures it runs On Mount AND when userId updates


  return (
    <div>
      
      <h3>PostList </h3>

      <label htmlFor="">
        <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
          {
            users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))
          }
        </select>
      </label>


      {isLoading && <p style={{color: 'green'}}>'Loading ...'</p>}
      {error && <p style={{color: 'red'}}>Something went wrong: {error}</p>}

      <section>
        { !isLoading && !error &&
          posts.map(post => (
            <article key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))
        }
      </section>
    </div>
  )
}

export default PostList





























