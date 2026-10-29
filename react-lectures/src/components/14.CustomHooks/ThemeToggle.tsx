import { article } from "motion/react-client";
import { useLocalStorage } from "./useLocalStorage";

type NoteType = {
  id: number,
  text: string
}


const initialNotes: NoteType[] = [
  {id: 1, text: 'Note 1'},
  {id: 2, text: 'Note 2'},
  {id: 3, text: 'Note 3'},
]

const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage<string>('theme', 'dark')
  const [name, setName] = useLocalStorage<string>('name', '')
  const [count, setCount] = useLocalStorage<Number>('count', 5)
  const [notes, setNotes] = useLocalStorage<NoteType[]>('notes', initialNotes)



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



      <button onClick={() => {setCount((count as number) + 1)}}> Counter: {count as number}</button>

 
      {
        notes.map(note => 
          <article key={note.id}>
            <p>{note.text}</p>
          </article>
        )
      } 

    </section>
  )
}

export default ThemeToggle