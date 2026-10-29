import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'dark')

  // Triggers: 
  //  1. on Mount 
  //  2. on Update
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, setTheme] as const
}
