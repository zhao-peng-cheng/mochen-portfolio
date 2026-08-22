import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Fade + rise on scroll into view. */
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
