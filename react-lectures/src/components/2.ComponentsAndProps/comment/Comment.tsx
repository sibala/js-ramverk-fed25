import type { Author } from "./types/Author"
import UserInfo from "./UserInfo"

/**
 * Refactoring a big component into smaller components.
 * Show the versions in order, and look at the component tree in React DevTools after each step.
 *
 * TypeScript makes refactoring safer: if you rename a prop, the editor shows every place that breaks.
 */

type CommentProps = {
  author: Author
  text: string
  date: Date // not only primitives: any type works, like the built-in Date
}

const Comment = ({ author, text, date }: CommentProps) => {
  return (
    <div className="Comment">
      {/* Version 1: before refactoring. Everything in one component */}
      {/* <div className="UserInfo">
        <img className="Avatar" src={author.avatarUrl} alt={author.name} width="64" />
        <div className="UserInfo-name">{author.name}</div>
      </div> */}

      {/* Version 2: refactor the image into an <Avatar /> component */}
      {/* <div className="UserInfo">
        <Avatar author={author}/>
        <div className="UserInfo-name">{author.name}</div>
      </div> */}

      {/* Version 3: refactor the whole user info into a <UserInfo /> component */}
      <UserInfo author={author} />

      <div className="Comment-text">{text}</div>
      <div className="Comment-date">{formatDate(date)}</div>
    </div>
  )
}

// Parameter types AND the return type: this function takes a Date and returns a string
function formatDate(date: Date): string {
  return date.toLocaleDateString()
}

export default Comment
