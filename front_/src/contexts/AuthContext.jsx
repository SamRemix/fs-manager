import { createContext, useReducer, useEffect } from 'react'

const init = {
  token: null
}

const Reducer = (state = token, { type, payload }) => {
  switch (type) {
    case 'POST':
      return {
        token: payload
      }

    case 'LOG_OUT':
      return {
        token: null
      }

    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}

export const AuthContext = createContext(init)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, init)

  const storedToken = localStorage.getItem('token')

  useEffect(() => {
    if (!storedToken) {
      return
    }

    dispatch({ type: 'POST', payload: storedToken })
  }, [storedToken])

  console.log('AUTH_CONTEXT', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}