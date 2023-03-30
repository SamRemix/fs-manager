import { memo, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { UsersContext } from '../../contexts/UsersContext'

import PageTitle from '../../components/PageTitle'
// import ProfileNavbar from '../../components/ProfileNavbar'
import ProfileDetails from '../../components/ProfileDetails'

import setDocumentTitle from '../../utils/setDocumentTitle'

const UserProfile = () => {
  const [user, setUser] = useState(null)

  const { user: currentUser } = useContext(AuthContext)
  const { users } = useContext(UsersContext)

  const { id } = useParams()

  useEffect(() => {
    setUser(users?.find(({ _id }) => _id === id))
  }, [users])

  setDocumentTitle(user?.name)

  return (
    (user && currentUser) && (
      <section className="container">
        <PageTitle>Profile</PageTitle>

        {currentUser._id === id ? (
          <>
            <ProfileDetails />

            <p>Created on {new Date(currentUser.createdAt).toLocaleDateString('en', { dateStyle: 'long' })}</p>
            {currentUser.createdAt !== currentUser.updatedAt && (
              <p>Last updated {new Date(currentUser.updatedAt).toLocaleDateString('en', { dateStyle: 'long' })}</p>
            )}
          </>
        ) : <p>{user.name}</p>}
      </section>
    )
  )
}

export default memo(UserProfile)