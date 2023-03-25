import { useState } from 'react'

const useSearch = () => {
  const [prefix, setPrefix] = useState('')

  const searchBy = string => (
    string.trim().toLowerCase().includes(
      prefix.trim().toLowerCase()
    )
  )

  const search = data => (
    data.filter(({ name, email }) => (
      searchBy(name) || searchBy(email)
    ))
  )

  return { prefix, setPrefix, search }
}

export default useSearch