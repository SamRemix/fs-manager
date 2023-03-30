import { memo, useState, useEffect } from 'react'

import useFetch from '../../hooks/useFetch'

import Input from '../Input'
import Button from '../Button'

const ProfileDetails = ({ user }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [])

  const { fetchData } = useFetch({
    method: 'patch',
    url: `/users/${user?._id}`
  })

  const update = e => {
    e.preventDefault()

    fetchData({ name, email })
  }

  return (
    <div>
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

      <p>Created on {new Date(user.createdAt).toLocaleDateString('en', { dateStyle: 'long' })}</p>
      {user.createdAt !== user.updatedAt && (
        <p>Last updated {new Date(user.updatedAt).toLocaleDateString('en', { dateStyle: 'long' })}</p>
      )}
    </div>
  )
}

export default memo(ProfileDetails)