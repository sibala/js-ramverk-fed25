import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <>
      <h1>404 – Page not found</h1>
      <Link to="/">Back to all puns</Link>
    </>
  )
}

export default NotFoundPage