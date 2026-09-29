import type { Author } from "../types";

type UserInfoProps = {
  author: Author
}

const UserInfo = ({author}: UserInfoProps) => {
  return (
    <section className="author-info">
      <p>{author.fullname}</p>
      <img src={author.image} alt="profile" height="50" />
    </section>
  )
}

export default UserInfo