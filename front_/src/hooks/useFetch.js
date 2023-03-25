import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'
import { UsersContext } from '../contexts/UsersContext'

import axios from 'axios'

const useFetch = ({ method, url }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')

  const { dispatch: setToken } = useContext(AuthContext)
  const { dispatch: setUsers } = useContext(UsersContext)

  const navigate = useNavigate()

  // create axios instance to set the API as base url
  const instance = axios.create({ baseURL: 'http://localhost:4000' })

  // log error if invalid method
  if (!Object.keys(instance).includes(method)) {
    console.log(`Invalid '${method}' method`)
  }

  // body = data to send if method = 'post' || 'update'
  const fetchData = async (body = null) => {
    try {
      const { data } = await instance[method](url, body)

      // reusable dispatch function for any context
      const exec = dispatch => (
        dispatch({
          // type: 'GET' || 'POST' || 'PATCH' || 'DELETE'
          type: method.toUpperCase(),
          payload: data
        })
      )

      exec({
        auth: setToken,
        users: setUsers
      }[url.split('/')[1]])

      if (url.startsWith('/auth')) {
        localStorage.setItem('auth', JSON.stringify(data))
        navigate('/')
      }

      setResponse(data)
    } catch ({ response }) {
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