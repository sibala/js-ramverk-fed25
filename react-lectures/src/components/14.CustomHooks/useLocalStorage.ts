import { useEffect, useState } from "react";

// T enables the user of this funcition to send in types through <T>, T are generics in TS
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // To ensure that useState initial value is set only Once on Mount, implement lazy initialization
  // meaning assign a callback function instead of the value it self
  const [value, setValue] = useState<T>(() => {
    console.log('lazy initialization ensures this runs only once On Mount')

    const cachedValue = localStorage.getItem(key)
    return cachedValue !== null ? JSON.parse(cachedValue) : initialValue
  })

  // Triggers: 
  //  1. on Mount 
  //  2. on Update
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue] as const
}
