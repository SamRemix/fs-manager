import { memo, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { UsersContext } from '../../contexts/UsersContext'

const UserProfile = () => {
  const [user, setUser] = useState(null)

  const { users } = useContext(UsersContext)

  const { id } = useParams()

  useEffect(() => {
    setUser(users?.find(({ _id }) => _id === id))
  }, [users])

  return (
    <div>
      {user && (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  )
}

export default memo(UserProfile)