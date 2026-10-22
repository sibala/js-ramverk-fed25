import { capitalize, formatDate } from '../utils/format'
import type { Pun } from '../types'

type PunItemProps = {
  pun: Pun
}

const PunItem = ({ pun }: PunItemProps) => {
  return (
    <li className="pun">
      <p className="pun-content">{pun.content}</p>
      <p className="pun-meta">
        <span className="tag">{capitalize(pun.category)}</span>
        <span>{formatDate(pun.date)}</span>
      </p>
    </li>
  )
}

export default PunItem
