import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

const useLogOut = () => {
  const { dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const disconnect = () => {
    dispatch({ type: 'LOG_OUT' })

    localStorage.removeItem('token')

    navigate('/log-in')
  }

  return { disconnect }
}

export default useLogOut