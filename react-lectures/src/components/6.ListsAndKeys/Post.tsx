import type { BlogPost } from "./types";

type PostProps = {
  post: BlogPost
}

const Post = ({post}: PostProps) => {
  return (
    <article>
      <h3>{post.title} with Post ID: {post.id}</h3>
      <p>{post.content}</p>
    </article>
  )
}

export default Post