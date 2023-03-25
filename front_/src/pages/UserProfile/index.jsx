import { memo, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

const UserProfile = () => {
  const { user } = useContext(AuthContext)

  const { id } = useParams()
  console.log(id);
  // const { user } = JSON.parse(localStorage.getItem('auth'))

  const { name, email } = user

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  )
}

export default memo(UserProfile)