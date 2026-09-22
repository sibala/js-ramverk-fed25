import type { ReactNode } from "react"


type CardProps = {
    title: string,
    children: ReactNode
}

const Card = ({title, children}: CardProps) => {
  return (
    <article style={{border: '2px solid skyBlue', borderRadius: 8, margin: 10}}>
        <h3>{title}</h3>
        { children }
    </article>
  )
}

export default Card