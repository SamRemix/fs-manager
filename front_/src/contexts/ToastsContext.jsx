import { createContext, useRef } from 'react'

const add = toast => { }

const init = {
  addToastRef: { current: add }
}

export const ToastsContext = createContext(init)

export const ToastsProvider = ({ children }) => (
  <ToastsContext.Provider value={{ addToastRef: useRef(add) }}>
    {children}
  </ToastsContext.Provider>
)
