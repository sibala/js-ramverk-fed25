import { capitalize, formatDate } from "@/lib/format";
import { Pun } from "@/lib/types";
import Link from "next/link";


type PunItemProps = {
  pun: Pun
}

const PunItem = ({ pun}: PunItemProps) => {
  return (
    <li className="pun">
      <Link href={`/puns/${pun._id}`}><p className="pun-content">{pun.content}</p></Link>
      <p className="pun-meta">
        <span className="tag">{capitalize(pun.category)}</span>
        <span>{formatDate(pun.date)}</span>
      </p>
    </li>
  )
}

export default PunItem
