import { useState } from "react";
import type { Comment, Post } from "../types";
import CommentSection from "./CommentSection";
import UserInfo from "./UserInfo";

type PostType = {
  post: Post
  comment: Comment
}

const Post = ({post, comment}: PostType) => {

  const [displayComments, setDisplayComments] = useState(false)
  const [likes, setLikes] = useState(0)

  const superLike = () => {
    setLikes((prev) => prev + 1)
    setLikes((prev) => prev + 1)
    setLikes((prev) => prev + 1)
  }

  return (
    <article id="post">
      <h1>{post.headline}</h1>
      <p>{post.date.toLocaleDateString()}</p>
      <p>{post.content}</p>

      <UserInfo author={post.author} /> 


      <button 
        onClick={() => setLikes(likes + 1)}
        className={likes > 0 ? 'likes' : ''}
      >
          👍 {likes} likes
      </button>

      <button
        onClick={superLike}>Super likes (+3)</button>
      <button onClick={ () => setDisplayComments(!displayComments) }>
        { displayComments ? "Hide comments" : "Show comments" }
      </button>


      { displayComments && <CommentSection comment={comment} />}
    </article>

  )
}

export default Post