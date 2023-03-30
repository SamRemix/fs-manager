import { memo, useState, useEffect, useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import useFetch from '../../hooks/useFetch'

import Input from '../Input'
import Button from '../Button'

const ProfileDetails = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const { user } = useContext(AuthContext)

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
  }, [])

  const { fetchData } = useFetch({
    method: 'patch',
    url: `/users/${user?._id}`
  })

  const update = e => {
    e.preventDefault()

    fetchData({ name, email })
  }

  const updatePassword = e => {
    e.preventDefault()

    fetchData({ password, newPassword })
  }

  return (
    <>
      <h2>Name & email</h2>
      <form onSubmit={update}>
        <Input
          placeholder="Name"
          value={name}
          maxLength={32}
          onChange={({ target }) => {
            setName(target.value)
          }}
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value)
          }}
        />

        <Button className="submit">Update</Button>
      </form>

      <h2>Password</h2>
      <form onSubmit={updatePassword}>
        <Input
          type="password"
          placeholder="Current password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />

        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={({ target }) => {
            setNewPassword(target.value)
          }}
          isNew={true}
        />

        <Button className="submit">Update</Button>
      </form>
    </>
  )
}

export default memo(ProfileDetails)