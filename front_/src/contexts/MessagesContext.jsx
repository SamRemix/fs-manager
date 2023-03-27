import { createContext, useState } from 'react'

const init = {
  messages: []
}

export const MessagesContext = createContext(init)

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  console.log('MESSAGES', messages)

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  )
}
