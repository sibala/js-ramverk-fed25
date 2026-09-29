import type { Comment, Post } from "../types";
import CommentSection from "./CommentSection";
import UserInfo from "./UserInfo";

type PostType = {
  post: Post
  comment: Comment
}

const Post = ({post, comment}: PostType) => {
  return (
    <article id="post">
      <h1>{post.headline}</h1>
      <p>{post.date.toLocaleDateString()}</p>
      <p>{post.content}</p>


      <section className="author-info">
        <p>{post.author.fullname}</p>
        <img src={post.author.image} alt="profile" height="50" />
      </section>

      <UserInfo author={post.author} /> 


      <button>?? likes</button>
      <button>Super likes (+3)</button>
      <button>Hide comments</button>


      <CommentSection comment={comment} />
    </article>

  )
}

export default Post