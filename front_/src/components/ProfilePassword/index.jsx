import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'

import Input from '../Input'
import Button from '../Button'

const ProfileDetails = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const { id } = useParams()

  const { fetchData } = useFetch({
    method: 'patch',
    url: `/users/${id}`
  })

  const update = e => {
    e.preventDefault()

    fetchData({ password, newPassword })
  }

  return (
    <div>
      <form onSubmit={update}>
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
    </div>
  )
}

export default memo(ProfileDetails)