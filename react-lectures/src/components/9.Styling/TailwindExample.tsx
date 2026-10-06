import { useState } from 'react'

/**
 * Tailwind CSS: style with small utility classes directly in the markup.
 *
 * Setup in a new Vite project:
 *   npm install tailwindcss @tailwindcss/vite
 *   vite.config.js  →  plugins: [react(), tailwindcss()]
 *   index.css       →  @import "tailwindcss";
 *
 * Reading the classes:
 *   p-4 = padding 1rem   rounded-xl = border radius   bg-sky-500 = background color
 *   hover:bg-sky-600 = on hover   md:flex-row = from medium screens and up (mobile first!)
 *   dark:bg-slate-800 = in dark mode
 */
type Card = {
  id: number
  title: string
  text: string
}

const cards: Card[] = [
  { id: 1, title: 'Components', text: 'Small, reusable pieces of UI.' },
  { id: 2, title: 'Props', text: 'Data flowing down from parent to child.' },
  { id: 3, title: 'State', text: 'Memory that triggers a re-render when it changes.' },
]

const TailwindExample = () => {
  const [selectedId, setSelectedId] = useState(1)

  return (
    <section className="mx-auto max-w-3xl p-4 text-left">
      <h2 className="mb-4 text-2xl font-bold">Tailwind + conditional classes</h2>

      {/* Responsive: a column on mobile, a row from md and up */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setSelectedId(card.id)}
            className={`
              flex-1 rounded-xl border-2 p-4 text-left 
              ${selectedId === card.id ? 'border-sky-500 bg-sky-50 text-slate-900' : 'border-slate-300'}
            `}
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm opacity-80">{card.text}</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default TailwindExample
