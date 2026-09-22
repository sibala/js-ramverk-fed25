import Avatar from './Avatar'
import type { Author } from './types/Author'


type AuthorProps = {
    author: Author
}

const UserInfo = ({author}: AuthorProps) => {
  return (
    <div className="UserInfo">
        <Avatar author={author}/>
        <div className="UserInfo-name">{author.name}</div>
    </div>
  )
}

export default UserInfo