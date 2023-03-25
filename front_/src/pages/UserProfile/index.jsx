import { memo, useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

const UserProfile = () => {
  const { user } = useContext(AuthContext)
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