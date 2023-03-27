import './styles.scss'

import { memo, useState, useEffect } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import useMessages from '../../hooks/useMessages'

const Messages = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const { messages } = useMessages()

  const mouseEvent = listener => {
    addEventListener('mousemove', listener)
    return () => removeEventListener('mousemove', listener)
  }

  useEffect(() => {
    mouseEvent(e => {
      setPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  const messagesContainerAnimation = {
    animate: { ...position },
    transition: {
      type: 'spring', damping: 10, stiffness: 60, duration: .2
    }
  }

  const messageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: { duration: .2 }
  }

  return (
    <motion.div className="messages" {...messagesContainerAnimation}>
      <AnimatePresence mode="popLayout">
        {messages.map(({ id, content }) => (
          <motion.div key={id} layoutId={id} className="message" {...messageAnimation}>
            <p>{content}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default memo(Messages)