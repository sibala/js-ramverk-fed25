import Post from "./Post";
import type { BlogPost } from "./types";

const posts: BlogPost[] = [
  { id: 1, title: 'Hello World', content: 'Welcome to learning React!', published: true },
  { id: 2, title: 'Installation', content: 'You can install React from npm.', published: true },
  { id: 3, title: 'Draft', content: 'This post is not finished yet.', published: false },
]

const Blog = () => {
  /**
   * Version 1: Wrong way
   *
   * "key" is used by React to know which item is which when a list is updated.
   * If no key is given, React shows a warning in the console and uses the array index.
   * But the index changes when items are added, removed or re-ordered, so it can't be trusted.
   */
  // return (
  //   <div>
  //     {
  //       posts.map((post, index) => {
  //         return (
  //           <article key={index} >
  //             <h3>{post.title} with key index {index}</h3>
  //             <p>{post.content}</p>
  //           </article>
  //         )
  //       })
  //     }
  //   </div>
  // )

  /**
   * Version 2: Right way
   *
   * Use a stable, unique ID from the data as key.
   */
  // return (
  //   <div>
  //     {
  //       posts.map(post => {
  //         return (
  //           <article key={post.id} >
  //             <h3>{post.title} with Post ID: {post.id}</h3>
  //             <p>{post.content}</p>
  //           </article>
  //         )
  //       })
  //     }
  //   </div>
  // )

  /**
   * Version 3: Refactor to a child component
   * NOTE! The key goes on the component in the .map(), not inside Post
   */
  // return (
  //   <div>
  //     {
  //       posts.map(post => <Post key={post.id} post={post} />)
  //     }
  //   </div>
  // )


  /**
   * Version 4: Run .filter() and .map() directly in JSX
   * Hover over "post" in the .map(): TypeScript knows it's a BlogPost
   */

  return (
    <div>
      {
        posts
          .filter(post => post.published)
          .map(post => <Post key={post.id} post={post} />)
      }
    </div>
  )

}

export default Blog
