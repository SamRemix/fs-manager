import { memo, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { UsersContext } from '../../contexts/UsersContext'

import useFetch from '../../hooks/useFetch'

import PageTitle from '../../components/PageTitle'
import ProfileNavbar from '../../components/ProfileNavbar'
import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const { users } = useContext(UsersContext)

  const { id } = useParams()

  useEffect(() => {
    setUser(users?.find(({ _id }) => _id === id))
  }, [users])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  const { fetchData } = useFetch({
    method: 'patch',
    url: `/users/${user?._id}`
  })

  const update = e => {
    e.preventDefault()

    fetchData({ name, email, password, newPassword })
  }

  setDocumentTitle(user?.name)

  return (
    user && (
      <section className="container">
        <PageTitle>Profile</PageTitle>

        <ProfileNavbar />

        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>Created on {new Date(user.createdAt).toLocaleDateString('en', { dateStyle: 'long' })}</p>
        {user.createdAt !== user.updatedAt && (
          <p>Last updated {new Date(user.updatedAt).toLocaleDateString('en', { dateStyle: 'long' })}</p>
        )}

        <form onSubmit={update}>
          {/* <motion.div {...animation.nameInput}> */}
          <Input
            placeholder="Name"
            value={name}
            maxLength={32}
            onChange={({ target }) => {
              setName(target.value)
            }}
          />
          {/* </motion.div> */}

          {/* <motion.div {...animation.emailInput}> */}
          <Input
            placeholder="Email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value)
            }}
          />
          {/* </motion.div> */}

          {/* <motion.div {...animation.passwordInput}> */}
          <Input
            type="password"
            placeholder="Current password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
          {/* </motion.div> */}

          {/* <motion.div {...animation.passwordInput}> */}
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={({ target }) => {
              setNewPassword(target.value)
            }}
            isNew={true}
          />
          {/* </motion.div> */}

          {/* <motion.div {...animation.submitButton}> */}
          <Button className="submit">Update</Button>
          {/* </motion.div> */}
        </form>
      </section>
    )
  )
}

export default memo(UserProfile)