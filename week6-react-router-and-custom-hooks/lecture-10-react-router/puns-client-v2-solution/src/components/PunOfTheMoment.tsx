import React, { useEffect, useState } from 'react'
import type { Pun } from '../types';

type PunOfTheMomentProps = {
  puns: Pun[]
}
const PunOfTheMoment = ({puns}: PunOfTheMomentProps) => {
  const [index, setIndex] = useState(0)
  const count = puns.length

  useEffect(() => {
    console.log('UseEffect PunOfTheMomentProps:') 
    
    let intervalID = setInterval(() => {
        console.log('Tick')
        setIndex((prev) => {
          // Math.random() -> random number between 0 and 1, including 0, exkluding 1: 0.9999999999
          // If count 13 => 13 * 0.9999999 => 12.9999999999999
          // Index of 13 puns goes from 0-12
          // Math.floor(12.9999999999999) => 12
          // Summary Math.floor(Math.random * 13) =  we will get a random number between 0-12
          return Math.floor(Math.random() * count)
        })
      },
      10_000 // 10 sec
    )

    return () => {
      clearInterval(intervalID)
    }
    
  }, [count])

  return (
    <>
      <aside className="pun-of-the-moment">
        <label className="label">Pun of the Moment</label>
        <p>{puns[index]?.content}</p>
      </aside>      
    </>
  )
}

export default PunOfTheMoment