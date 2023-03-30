import { useState, useEffect, useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { UsersContext } from '../contexts/UsersContext'

import useToasts from './useToasts'

import axios from 'axios'

const useFetch = ({ method, url, type = null }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { dispatch: setToken } = useContext(AuthContext)
  const { dispatch: setUsers } = useContext(UsersContext)

  // use add function to return a message
  const { add } = useToasts()

  // create axios instance to set the API as base url
  const instance = axios.create({ baseURL: 'http://localhost:4000' })

  // log error if invalid method
  if (!Object.keys(instance).includes(method)) {
    console.log(`Invalid '${method}' method`)
  }

  // body = data to send if method = 'post' || 'patch'
  const fetchData = async (body = null) => {
    try {
      const { data } = await instance[method](url, body)

      // reusable dispatch function for any context
      const exec = dispatch => (
        dispatch({
          // type: 'GET' || 'POST' || 'PATCH' || 'DELETE'
          type: type || method.toUpperCase(),
          payload: data
        })
      )

      // executes dispatch function and return a message
      const dispatcher = {
        auth: () => {
          exec(setToken)

          localStorage.setItem('auth', JSON.stringify(data))

          navigate('/')

          return {
            signup: () => add('Successfully signed up'),
            login: () => add('Successfully logged in')
          }[url.split('/')[2]]()
        },
        users: () => {
          exec(setUsers)

          return {
            get: () => { },
            patch: () => add(`Successfully updated profile`),
            delete: () => add(`Successfully deleted user`)
          }[method]()
        }
      }

      dispatcher[url.split('/')[1]]()

      setResponse(data)
    } catch ({ response }) {
      console.log(response.data.error);
      setError(response.data.error)
    }
  }

  useEffect(() => {
    if (method === 'get') {
      fetchData()
    }
  }, [method, url])

  return { response, error, fetchData }
}

export default useFetch

/*

  GET request:
const { response } = useFetch({
  method: 'get',
  url: '/users'
})

console.log(response) // => [{}, {}, ...]


  POST || PATCH request:
const { fetchData } = useFetch({
  method: 'post',
  url: '/auth/signup'
})

const { fetchData } = useFetch({
  method: 'patch',
  url: `/users/${user._id}`
})

() => fetchData({
  name: 'Exemple',
  email: 'exemple@gmail.com',
  password: 'Exemple.1'
})


  DELETE request:
const { fetchData } = useFetch({
  method: 'delete',
  url: `/users/${user._id}`
})

() => fetchData()

*/