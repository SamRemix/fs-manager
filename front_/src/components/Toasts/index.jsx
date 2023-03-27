import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import useToasts from '../../hooks/useToasts'

const Messages = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const { toasts } = useToasts()

  const mouseEvent = listener => {
    addEventListener('mousemove', listener)
    return () => removeEventListener('mousemove', listener)
  }

  useEffect(() => {
    mouseEvent(e => {
      setPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  const toastsContainerAnimation = {
    animate: { ...position },
    transition: {
      type: 'spring', damping: 10, stiffness: 60, duration: .2
    }
  }

  const toastAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: { duration: .2 }
  }

  return (
    <motion.div className="toasts" {...toastsContainerAnimation}>
      <AnimatePresence mode="popLayout">
        {toasts.map(({ id, content, type }) => (
          <motion.div
            key={id}
            layoutId={id}
            className={type === 'error' ? 'toast error' : 'toast'}
            {...toastAnimation}>
            <p>{content}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default memo(Messages)