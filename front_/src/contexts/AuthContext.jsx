import { createContext, useReducer, useEffect } from 'react'

const init = {
  token: null,
  user: null
}

const Reducer = (state = init, { type, payload }) => {
  switch (type) {
    case 'POST':
      return {
        token: payload.token,
        user: payload.user
      }

    case 'LOG_OUT':
      return {
        token: null,
        user: null
      }

    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}

export const AuthContext = createContext(init)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, init)

  const storage = localStorage.getItem('auth')

  useEffect(() => {
    if (!storage) {
      return
    }

    dispatch({ type: 'POST', payload: JSON.parse(storage) })
  }, [storage])

  console.log('AUTH_CONTEXT', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}