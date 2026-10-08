import { motion } from 'motion/react'
import PageTitle from './PageTitle';

const MotionBasics = () => {
  return (
    <div>

      {/* 1.  Basic transition */}
      <PageTitle title="MotionBasics"/>

      {/* 2. Other kinds of transitions, spring is sometimes more fun than duraton */}
      <motion.p
        initial={{opacity: 0, rotate: 360}}
        animate={{opacity: 1, rotate: 0}}
        transition={{type: "spring", stiffness: 100, repeat: Infinity, repeatDelay: 1}}
      >
        There is no better way to mess with your users
      </motion.p>


      {/* 3. On Tap & On hover animations */}
      <motion.button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 mb-10"
        whileHover={{scale: 2, x: 400, y: -1000}}
        whileTap={{scale: 1}}
      >
        Click me
      </motion.button>



      {/* 4. On scoll animations */}
      <div style={{height: 1000}}>Scroll down ↓</div>
      <motion.h2
        initial={{opacity: 0, x: -500}}
        whileInView={{opacity: 1, x: 0}}
        viewport={{ once: true }}
      >
        I slide in when you scoll to me
      </motion.h2>
    </div>
  )
}

export default MotionBasics