import { memo, useEffect, useState } from 'react'

import axios from 'axios'

const Home = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/users')

      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <section className="container">
      <h1>Home</h1>
      <div>
        {users.map(({ _id, name }) => (
          <p key={_id}>{name}</p>
        ))}
      </div>
    </section>
  )
}

export default memo(Home)