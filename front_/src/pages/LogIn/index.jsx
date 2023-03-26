import { memo, useState } from 'react'

import useFetch from '../../hooks/useFetch'

import Input from '../../components/Input'
import Button from '../../components/Button'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, fetchData } = useFetch({
    method: 'post',
    url: '/auth/login',
    type: 'LOG_IN'
  })

  const login = e => {
    e.preventDefault()

    fetchData({ email, password })
  }

  return (
    <section className="container">
      <h1>Log in</h1>

      <form onSubmit={login}>
        <Input
          placeholder="Email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value)
          }}
          autoFocus={true}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />

        <Button className="submit">Log in</Button>

        {error && (
          <p>{error}</p>
        )}
      </form>
    </section>
  )
}

export default memo(LogIn)