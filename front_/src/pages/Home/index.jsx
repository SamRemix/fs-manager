import { memo, useContext } from 'react'

import { UsersContext } from '../../contexts/UsersContext'
import { motion } from 'framer-motion'

import useFetch from '../../hooks/useFetch'

import PageTitle from '../../components/PageTitle'

import setDocumentTitle from '../../utils/setDocumentTitle'

const User = ({ name, _id }) => {
  const { fetchData: deleteUser } = useFetch({
    method: 'delete',
    url: `/users/${_id}`
  })

  setDocumentTitle('Home')

  return (
    <div key={_id} style={{
      padding: '1rem',
      background: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, .4)',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    }}>
      <p>{name}</p>
      <p onClick={deleteUser} style={{
        padding: '.25rem',
        color: '#ff3e00',
        cursor: 'pointer'
      }}>DELETE</p>
    </div>
  )
}

const Home = () => {
  const { users } = useContext(UsersContext)

  return (
    <section className="container">
      <PageTitle>Home</PageTitle>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
        {users && users.map(user => (
          <User key={user._id} {...user} />
        ))}
      </motion.div>
    </section>
  )
}

export default memo(Home)