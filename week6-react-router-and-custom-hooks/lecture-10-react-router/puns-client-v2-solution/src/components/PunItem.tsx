import { capitalize, formatDate } from '../utils/format'
import type { Pun } from '../types'

type PunItemProps = {
  pun: Pun,
  deletePun: (deleteID: string) => void
  editPun: (pun: Pun) => void
}

const PunItem = ({ pun, deletePun, editPun }: PunItemProps) => {
  return (
    <li className="pun">
      <p className="pun-content">{pun.content}</p>
      <p className="pun-meta">
        <span className="tag">{capitalize(pun.category)}</span>
        <span>{formatDate(pun.date)}</span>
      </p>

      <section className="actions">
        <button onClick={() => editPun(pun)}>Edit</button>
        <button onClick={() => deletePun(pun._id)}>Delete</button>
      </section>
    </li>
  )
}

export default PunItem
