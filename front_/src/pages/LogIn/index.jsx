import { memo, useState } from 'react'

import { motion } from 'framer-motion'
import animation from './motion.config'

import useFetch from '../../hooks/useFetch'

import PageTitle from '../../components/PageTitle'
import Input from '../../components/Input'
import Button from '../../components/Button'

import setDocumentTitle from '../../utils/setDocumentTitle'

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

  setDocumentTitle('Log in')

  return (
    <section className="container">
      <PageTitle>Log in</PageTitle>

      <form onSubmit={login}>
        <motion.div {...animation.emailInput}>
          <Input
            placeholder="Email"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value)
            }}
            autoFocus={true}
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
          />
        </motion.div>

        <motion.div {...animation.submitButton}>
          <Button className="submit">Log in</Button>
        </motion.div>

        {error && (
          <p>{error}</p>
        )}
      </form>
    </section>
  )
}

export default memo(LogIn)