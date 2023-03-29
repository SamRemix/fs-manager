import { createContext, useReducer } from 'react'

const init = {
  users: null
}

const Reducer = ({ users } = init, { type, payload }) => {
  switch (type) {
    case 'GET':
      return {
        users: payload
      }

    case 'PATCH':
      return {
        users: users.map(user => (
          user._id === payload._id ? payload : user
        ))
      }

    case 'DELETE':
      return {
        users: users.filter(user => (
          user._id !== payload._id
        ))
      }

    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}

export const UsersContext = createContext(init)

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, init)

  console.log('USERS_CONTEXT', state)

  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}