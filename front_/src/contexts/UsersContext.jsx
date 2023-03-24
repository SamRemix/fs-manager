import { createContext, useReducer } from 'react'

const users = null

const Reducer = (state = users, { type, payload }) => {
  switch (type) {
    case 'GET':
      return {
        users: payload
      }

    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}

export const UsersContext = createContext(users)

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, users)

  console.log('USERS_CONTEXT', state)

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}