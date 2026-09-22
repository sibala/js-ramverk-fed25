import type { Author } from "./types/Author"

type AuthorProps = {
    author: Author
}

const Avatar = ({author}: AuthorProps) => {
  return (
    <img className="Avatar" src={author.avatarUrl} alt={author.name} width="64" />
  )
}

export default Avatar