import { useContext } from 'react'

import { ToastsContext } from '../contexts/ToastsContext'

const useToasts = () => {
  const { toasts, setToasts } = useContext(ToastsContext)

  const add = (content, type = 'default') => {
    const toast = { id: Date.now(), content, type, duration: type === 'error' ? 4 : 2.5 }
    console.log(toast);

    setToasts(toasts => [toast, ...toasts])

    // removes toast after delay
    setTimeout(() => {
      setToasts(toasts => (
        toasts.filter(({ id }) => id !== toast.id)
      ))
    }, toast.duration * 1000)

    return toast
  }

  const remove = id => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id))
  }

  return { toasts, add, remove }
}

export default useToasts