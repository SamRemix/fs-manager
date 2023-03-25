import { memo, useState } from 'react'

import useFetch from '../../hooks/useFetch'

// import PasswordVerifier from '../../components/PasswordVerifier'
// import input from '../../components/input'
// import Button from '../../components/Button'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, fetchData } = useFetch({
    method: 'post',
    url: '/auth/signup'
  })

  const signup = e => {
    e.preventDefault()

    console.log({ name, email, password })

    fetchData({ name, email, password })
  }

  return (
    <section className="container">
      <form onSubmit={signup}>
        <input
          placeholder="Name"
          value={name}
          onChange={({ target }) => {
            setName(target.value)
          }}
          autoFocus
        />

        <input
          placeholder="Email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value)
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />

        <button>Sign up</button>

        {error && (
          <p>{error}</p>
        )}
      </form>
    </section>
  )
}

export default memo(SignUp)