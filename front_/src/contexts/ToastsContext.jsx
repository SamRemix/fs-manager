import { createContext, useRef } from 'react'

import Toasts from '../components/Toasts'

const add = toast => { }

const init = {
  toastRef: { current: add }
}

export const ToastsContext = createContext(init)

export const ToastsProvider = ({ children }) => (
  <ToastsContext.Provider value={{ toastRef: useRef(add) }}>
    <Toasts />
    {children}
  </ToastsContext.Provider>
)
