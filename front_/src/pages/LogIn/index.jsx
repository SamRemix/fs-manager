import { memo, useState } from 'react'

import useFetch from '../../hooks/useFetch'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, fetchData } = useFetch({
    method: 'post',
    url: '/auth/login'
  })

  const login = e => {
    e.preventDefault()

    fetchData({ email, password })
  }

  return (
    <section className="container">
      <form onSubmit={login}>
        <input
          placeholder="Email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value)
          }}
          autoFocus
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />

        <button>Log in</button>

        {error && (
          <p>{error}</p>
        )}
      </form>
    </section>
  )
}

export default memo(LogIn)