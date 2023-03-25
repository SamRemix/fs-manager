import { createContext, useReducer, useEffect } from 'react'

const token = localStorage.getItem('token')

const Reducer = (state = token, { type, payload }) => {
  switch (type) {
    case 'POST':
      return {
        token: payload
      }

    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}

export const AuthContext = createContext(token)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, token)

  useEffect(() => {
    if (!token) {
      return
    }

    dispatch({ type: 'POST', payload: token })
  }, [])

  console.log('AUTH_CONTEXT', state)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}