import { useCallback, useContext } from 'react'

import { ToastsContext } from '../contexts/ToastsContext'

const useToasts = () => {
  const { toastRef } = useContext(ToastsContext)

  const add = useCallback(newToast => {
    toastRef.current(newToast)
  }, [toastRef])

  return { add }
}

export default useToasts