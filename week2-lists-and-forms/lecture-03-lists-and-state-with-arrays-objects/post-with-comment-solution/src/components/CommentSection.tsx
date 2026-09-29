import type { Comment } from '../types';
import UserInfo from './UserInfo';

type CommentSectionProps = {
  comment: Comment
}

const CommentSection = ({comment}: CommentSectionProps) => {
  return (
    <section id="comment-section">
      <h2>Comment Section</h2>

      <article className="comment">
        <p>
          {comment.content}
          <br />
          {comment.date.toLocaleDateString()}
        </p>

        <UserInfo author={comment.author} />
      </article>
    </section>
  )
}

export default CommentSection