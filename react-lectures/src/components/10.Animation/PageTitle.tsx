import { motion } from 'motion/react'

type PageTitle = {
    title: string
}

const PageTitle = ({title}: PageTitle ) => {
  return (
    <motion.h1
        className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl"
        initial={{scale: 0}}
        animate={{scale: 1}}
        transition={{ease: "easeIn", duration: 2}}
      >
        {title}
    </motion.h1>
  )
}

export default PageTitle