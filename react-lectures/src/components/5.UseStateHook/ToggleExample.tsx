import { useState } from "react";

const ToggleExample = () => {
  const [isVisible, setIsVisible] = useState(false)
  console.log(isVisible);
  return (
    <div>
      {/* Solution 1: ternary operation */}
      {/* <button onClick={() => setIsVisible(isVisible ? false: true)}>The secret</button> */}
      
      {/* Solution 2: !invert value */}
      <button onClick={() => setIsVisible(!isVisible)}>The secret</button>
      { isVisible && <p>React re-renders components everytime state changes</p>}
    </div>
  )
}

export default ToggleExample