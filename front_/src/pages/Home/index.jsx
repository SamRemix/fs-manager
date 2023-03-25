import { memo, useContext } from 'react'

import { UsersContext } from '../../contexts/UsersContext'

import useFetch from '../../hooks/useFetch'

const User = ({ name, _id }) => {
  const { fetchData: deleteUser } = useFetch({
    method: 'delete',
    url: `/users/${_id}`
  })

  return (
    <div key={_id}>
      <p>{name}</p>
      <p onClick={deleteUser}>DELETE</p>
    </div>
  )
}

const Home = () => {
  const { users } = useContext(UsersContext)

  return (
    <section className="container">
      <h1>Home</h1>
      {users && users.map(user => (
        <User key={user._id} {...user} />
      ))}
    </section>
  )
}

export default memo(Home)