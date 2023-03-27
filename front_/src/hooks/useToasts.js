import { useCallback, useContext } from 'react'

import { ToastsContext } from '../contexts/ToastsContext'

const useToasts = () => {
  const { addToastRef } = useContext(ToastsContext)

  const add = useCallback(newToast => {
    addToastRef.current(newToast)
  }, [addToastRef])

  return { add }
}

export default useToasts