import { memo, useState, useEffect, useContext } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

import { UsersContext } from '../../contexts/UsersContext'

import PageTitle from '../../components/PageTitle'
import ProfileNavbar from '../../components/ProfileNavbar'
import ProfileDetails from '../../components/ProfileDetails'
import ProfilePassword from '../../components/ProfilePassword'

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

        <ProfileNavbar />

        <Routes>
          <Route path="/" element={<ProfileDetails user={user} />} />
          <Route path="/password" element={<ProfilePassword />} />
        </Routes>
      </section>
    )
  )
}

export default memo(UserProfile)