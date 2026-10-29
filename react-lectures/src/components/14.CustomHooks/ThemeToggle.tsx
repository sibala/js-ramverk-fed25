import { useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark')

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

      {/* <p>
        <label>
          Your name: <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </p> */}

    </section>
  )
}

export default ThemeToggle