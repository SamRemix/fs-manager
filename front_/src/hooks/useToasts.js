import { useContext } from 'react'

import { ToastsContext } from '../contexts/ToastsContext'

const useToasts = () => {
  const { toasts, setToasts } = useContext(ToastsContext)

  const add = newMessage => {
    const toast = { id: Date.now(), content: newMessage }

    setToasts(toasts => [toast, ...toasts])

    // removes toast after delay
    setTimeout(() => {
      setToasts(toasts => (
        toasts.filter(({ id }) => id !== toast.id)
      ))
    }, 2500)
  }

  return { toasts, add }
}

export default useToasts