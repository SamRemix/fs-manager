import { memo, useState } from 'react'

import useFetch from '../../hooks/useFetch'

import Input from '../../components/Input'

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

    fetchData({ name, email, password })
  }

  return (
    <section className="container">
      <h1>Sign up</h1>

      <form onSubmit={signup}>
        <Input
          placeholder="Name"
          value={name}
          onChange={({ target }) => {
            setName(target.value)
          }}
          autoFocus
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value)
          }}
        />

        <Input
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