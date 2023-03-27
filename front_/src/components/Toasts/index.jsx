import './styles.scss'

import { memo, useState, useContext } from 'react'

import { ToastsContext } from '../../contexts/ToastsContext'

const Toasts = () => {
  const [toasts, setToasts] = useState([])

  const { toastRef } = useContext(ToastsContext)

  toastRef.current = toast => {
    setToasts(toasts => [...toasts, toast])

    // removes toast after delay
    setTimeout(() => {
      setToasts(toasts => (
        toasts.filter(curr => curr !== toast)
      ))
    }, 1000)
  }

  console.log(toasts);

  return (
    <div className="toasts">
      {toasts.map(({ title }, i) => (
        <div key={i} className="toast">
          <p>{title}</p>
        </div>
      ))}
    </div>
  )
}

export default memo(Toasts)