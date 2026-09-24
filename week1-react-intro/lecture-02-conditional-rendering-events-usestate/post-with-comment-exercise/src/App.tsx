import profilePicture from './assets/profile-picture.png'
import './App.css'

/**
 * Exercise: Post with comment
 * See the picture in ../images/post-with-comment.png
 *
 * Part 1: Components and props (repetition of lecture 1)
 * - Create the function components Post, CommentSection and UserInfo in src/components
 * - Pass the objects "post" and "comment" below from App to the components, via props
 * - Describe the data with types. Tip: put Post, Comment and Author in a shared file, 
 *   for example types.ts, so several components can import them
 * - If a component and a type have the SAME name (the Post component and the Post type),
 *   import the type under another name:  import type { Post as PostType } from '../types'
 * - UserInfo shows an author's name and image. Use it in BOTH Post and CommentSection
 * - Use the ids/classes in App.css: #post, #comment-section, .comment, .author-info
 *
 * Part 2: Event handler + useState + conditional rendering
 * - Add a button in Post that shows/hides the CommentSection
 * - Create a state "displayComments" with useState
 * - Use && or a ternary operator to only render CommentSection when displayComments is true
 *
 * Part 3: Ternary operator
 * - The button text should say "Hide comments" when they are shown, and "Show comments" when hidden
 *
 * Part 4 (hard): Like button
 * - Add a like button in Post that counts likes: "👍 3 likes"
 * - Write "1 like" (singular) when there is exactly one like
 * - The button gets the class "liked" (see App.css) when it has at least one like
 *
 * Part 5 (extra hard): Updater function
 * - Add a "Super like" button that adds 3 likes by calling the setter function THREE times
 * - Why does it only add 1 if you write setLikes(likes + 1) three times? Fix it!
 */
function App() {
  const post = {
    headline: 'Some headline',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.',
    date: new Date(),
    author: {
      fullname: 'John Doe',
      image: profilePicture,
    },
  }

  const comment = {
    content: 'Awesome post dude!',
    date: new Date(),
    author: {
      fullname: 'Jane Doe',
      image: profilePicture,
    },
  }

  // You'll pass "comment" down in Part 1. Until then, this log keeps TypeScript happy
  console.log(comment)

  return (
    <div id="container">
      <img src={post.author.image} alt="profile" height="50" />
    </div>
  )
}

export default App
