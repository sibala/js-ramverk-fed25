import type { ReactNode } from 'react'

type MainProps = {
  title: string
  children: ReactNode
}

const Main = ({ title, children }: MainProps) => {
  return (
    <main>
      <h1>{title}</h1>
      {children}
    </main>
  )
}

export default Main
