import { capitalize, formatDate } from '../utils/format'
import type { Pun } from '../types'
import { Link } from 'react-router';

type PunItemProps = {
  pun: Pun
}

const PunItem = ({ pun}: PunItemProps) => {
  return (
    <li className="pun">
      <Link to={`/puns/${pun._id}`}><p className="pun-content">{pun.content}</p></Link>
      <p className="pun-meta">
        <span className="tag">{capitalize(pun.category)}</span>
        <span>{formatDate(pun.date)}</span>
      </p>
    </li>
  )
}

export default PunItem
