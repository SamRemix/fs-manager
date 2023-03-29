import { memo, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { UsersContext } from '../../contexts/UsersContext'

import PageTitle from '../../components/PageTitle'

import setDocumentTitle from '../../utils/setDocumentTitle'

const UserProfile = () => {
  const [user, setUser] = useState(null)

  const { users } = useContext(UsersContext)

  const { id } = useParams()

  useEffect(() => {
    setUser(users?.find(({ _id }) => _id === id))
  }, [users])

  setDocumentTitle(user?.name)

  return (
    user && (
      <section className="container">
        <PageTitle>Profile</PageTitle>

        <p>{user.name}</p>
        <p>{user.email}</p>
      </section>
    )
  )
}

export default memo(UserProfile)