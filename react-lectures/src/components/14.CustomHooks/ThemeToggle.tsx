import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage()


  // Small exercise for the class during the break
  // Ajsut useLocalStorage() so that it can take care of the state logic for the "name"-state, and not just the "theme"-state
  const [name, setName] = useState(localStorage.getItem('name') ?? '')
  useEffect(() => {
    localStorage.setItem('name', name)
  }, [name])


  const isDark = theme === 'dark'
  const themeStyle = {
    padding: '1rem',
    borderRadius: 8,
    background: isDark ? '#1a1a1a' : '#f4f4f4',
    color: isDark ? '#fff' : '#1a1a1a',
  }

  return (
    <section style={themeStyle}>
      <p>
        Theme: <strong>{theme}</strong>
      </p>
      <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>Toggle theme</button>

      <p>
        <label>
          Your name: <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </p>

    </section>
  )
}

export default ThemeToggle