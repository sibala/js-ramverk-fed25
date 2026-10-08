import { motion, type Variants } from 'motion/react';

const list: Variants = {
  hidden: {},
  show: {opacity: 1, transition: {staggerChildren: 2}},
}

const item = {
  hidden: {opacity: 0,  x: 100 },
  show: {opacity: 1,  x: 0},
}


const skills: string[] = ['HTML', 'CSS', 'JavsScript', 'Express', 'MySQL', 'React']
const StaggerList = () => {
  return (
    <motion.ul variants={list} initial="hidden" animate="show">
      {
        skills.map(skill => (
          <motion.li variants={item}>
            {skill}
          </motion.li>
        ))
      }
    </motion.ul>
  )
}

export default StaggerList