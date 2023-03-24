import { memo } from 'react'

import useFetch from '../../../hooks/useFetch'

const Home = () => {

  const { response: users } = useFetch({
    method: 'get',
    url: '/users'
  })

  users && console.log('USERS', users)

  return (
    <section className="container">
      <h1>Home</h1>
    </section>
  )
}

export default memo(Home)