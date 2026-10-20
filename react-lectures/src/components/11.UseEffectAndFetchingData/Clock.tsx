import { useEffect, useState } from "react";

/**
 * The lifecycle of a component: mount → update(s) → unmount
 */
const Clock = () => {
  const [date, setDate] = useState(new Date())

 
  /**
   * 2. Runs AFTER the component is mounted (shown on the screen).
   * The Clock asks the browser to call tick() once a second.
   */
  useEffect(() => {
    console.log('UseEffect: Mount')
  /**
   * 3. Every second, tick() calls setDate(). React knows the state changed,
   * calls the component again and updates the DOM with the new time.
   */
    const timerID = setInterval(tick, 1000)

    

    /**
     * 4. Cleanup: runs when the Clock is removed from the screen (unmount).
     * Without it, the timer would keep running forever (a memory leak).
     */
    return () => {
      console.log('UseEffect: UnMount')
      clearInterval(timerID)
    }
  }, []) // Empty dependecy array = Ensures UseEffect runs only once on Mount

  function tick() {
    console.log('Tick')
    setDate(new Date())
  }

  /**
   * 1. React calls the component function and learns what should be on the screen.
   */
  return <div>{date.toLocaleTimeString()}</div>
}

export default Clock

