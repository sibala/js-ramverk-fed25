import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react'

const AnimatePresenceExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div drag>

      <button 
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-6"
        onClick={() => setIsOpen(!isOpen)}
        >
        {isOpen ? 'Close' : 'Open'} the message
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            key="message"
            initial={{opacity: 0 }}
            animate={{opacity: 1, transition: {duration: 2}}}
            exit={{ opacity: 0, transition: {duration: 2}} }
          >
            Hello, I animate in and out 👋
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AnimatePresenceExample