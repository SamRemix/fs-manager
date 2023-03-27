import { useContext } from 'react'

import { MessagesContext } from '../contexts/MessagesContext'

const useMessages = () => {
  const { messages, setMessages } = useContext(MessagesContext)

  const add = newMessage => {
    const message = { id: Date.now(), content: newMessage }

    setMessages(messages => [message, ...messages])

    // removes toast after delay
    setTimeout(() => {
      setMessages(messages => (
        messages.filter(({ id }) => id !== message.id)
      ))
    }, 2500)
  }

  return { messages, add }
}

export default useMessages