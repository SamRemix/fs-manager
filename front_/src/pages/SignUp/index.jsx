import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import animation from './motion.config'

import useFetch from '../../hooks/useFetch'

import PageTitle from '../../components/PageTitle'
import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, fetchData } = useFetch({
    method: 'post',
    url: '/auth/signup',
    type: 'SIGN_UP'
  })

  const signup = e => {
    e.preventDefault()

    fetchData({ name, email, password })
  }

  setDocumentTitle('Sign up')

  return (
    <section className="container">
      <PageTitle>Sign up</PageTitle>

      <form onSubmit={signup}>
        <motion.div {...animation.nameInput}>
          <Input
            placeholder="Name"
            value={name}
            maxLength={32}
            onChange={({ target }) => {
              setName(target.value)
            }}
            autoFocus
          />
        </motion.div>

        <motion.div {...animation.emailInput}>
          <Input
            placeholder="Email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value)
            }}
          />
        </motion.div>

        <motion.div {...animation.passwordInput}>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
            }}
            isNew={true}
          />
        </motion.div>

        <motion.div {...animation.submitButton}>
          <Button className="submit">Sign up</Button>
        </motion.div>

        {error && (
          <p>{error}</p>
        )}
      </form>
    </section>
  )
}

export default memo(SignUp)