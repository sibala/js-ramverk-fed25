import { useEffect, useState } from "react";


/**
 * The lifecycle of a component: mount → update(s) → unmount
 */
const HooksExample = () => {
  const [date, setDate] = useState(new Date())
  const [count, setCount] = useState(0)


  useEffect(() => {
    console.log('Useffect 1: Update title')
    document.title = `You clicked ${count} times`
  }, [count]) // Ensures UseEffect 1 runs once on Mount and when "count" updates

 
  useEffect(() => {
    console.log('UseEffect 2: Initiate Clock/Timer')
    const timerID = setInterval(tick, 1000)

    return () => {
      console.log('UseEffect: UnMount')
      clearInterval(timerID)
    }
  }, []) // Empty dependecy array = Ensures UseEffect runs only once on Mount

  function tick() {
    console.log('Tick')
    setDate(new Date())
  }

  return (
    <div>
      <p>{date.toLocaleTimeString()}</p>
      <button onClick={() => setCount(count + 1)}> Increment count: {count}</button>
    </div>
  )
}

export default HooksExample














