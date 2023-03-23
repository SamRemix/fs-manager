import { memo, useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
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
    <div className="App">
      <h1 className="title">
        {'Cloud_remix'.split('_').map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </h1>
      <br />
      {users.map(({ _id, name, email }) => (
        <div key={_id}>
          <p>{name}</p>
          <p>{email}</p>
        </div>
      ))}
    </div>
  )
}

export default memo(App)
