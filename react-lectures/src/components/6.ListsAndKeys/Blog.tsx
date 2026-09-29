type BlogPost = {
  id: number
  title: string
  content: string
  published: boolean
}

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
  return (
    <div>Post list</div>
  )

  /**
   * Version 2: Right way
   *
   * Use a stable, unique ID from the data as key.
   */


  /**
   * Version 3: Refactor to a child component
   * NOTE! The key goes on the component in the .map(), not inside Post
   */


  /**
   * Version 4: Run .filter() and .map() directly in JSX
   * Hover over "post" in the .map(): TypeScript knows it's a BlogPost
   */
}

export default Blog
