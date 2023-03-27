import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

import useToasts from './useToasts'

const useLogOut = () => {
  const { dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const { add } = useToasts()

  const disconnect = () => {
    dispatch({ type: 'LOG_OUT' })

    localStorage.removeItem('auth')

    navigate('/log-in')

    add('Logged out')
  }

  return { disconnect }
}

export default useLogOut