import { createContext, useState } from 'react'

const init = {
  toasts: []
}

export const ToastsContext = createContext(init)

export const ToastsProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  console.log('TOASTS', toasts)

  return (
    <ToastsContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastsContext.Provider>
  )
}
