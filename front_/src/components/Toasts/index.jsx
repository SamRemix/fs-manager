import './styles.scss'

import { memo, useState, useEffect, useContext } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { ToastsContext } from '../../contexts/ToastsContext'

const Toasts = () => {
  const [toasts, setToasts] = useState([])
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const { addToastRef } = useContext(ToastsContext)

  addToastRef.current = prop => {
    const toast = { id: Date.now(), ...prop }

    setToasts(toasts => [...toasts, toast])

    // removes toast after delay
    setTimeout(() => {
      setToasts(toasts => (
        toasts.filter(curr => curr !== toast)
      ))
    }, 2000)
  }

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
        {toasts.map(({ id, message }) => (
          <motion.div key={id} layoutId={id} className="toast" {...toastAnimation}>
            <p>{message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default memo(Toasts)