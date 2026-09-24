import { useState } from "react";

const UseStateExample = () => {


  // Version 1: How not to work with dynamic variables in ReactJS
  // let index = 0
  // const incrementGoneWrong = () => {
  //   index = index + 1
  //   console.log(index)
  // }

  const [count, setCount] = useState(0)
  console.log('UseStateExample  component is rendering')


  /**
   * State is a snapshot.
   * "count" does not change until the NEXT render, so this only adds 1, not 3.
   */
  const incrementByThreeWrong = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }


  /**
   * Updater function: React queues the updates and passes the latest value
   * to each function. Use this when the new state depends on the previous state.
   */
  const incrementByThree = () => {
    setCount(previous => previous + 1)
    setCount(previous => previous + 1)
    setCount(previous => previous + 1)
  }

  return (
    <div>
        <button onClick={() => setCount(count + 1)}>{count}</button>
        <button onClick={incrementByThreeWrong}>Increment by three in a Wrong way: {count} </button>
        <button onClick={incrementByThree}>Increment by three in a Correct way: {count} </button>
        <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default UseStateExample