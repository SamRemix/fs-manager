import { useCallback, useContext } from 'react'

import { ToastsContext } from '../contexts/ToastsContext'

const useToasts = () => {
  const { toastRef } = useContext(ToastsContext)

  return {
    add: useCallback(newToast => {
      toastRef.current(newToast)
    }, [toastRef])
  }
}

export default useToasts