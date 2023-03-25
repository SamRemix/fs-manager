import { useState } from 'react'

const useSearch = () => {
  const [prefix, setPrefix] = useState('')

  const searchBy = string => (
    // removes spaces from name, email & prefix,
    // converts them to lowercase to have the same string format
    // then, checks if name or email includes the input value (prefix)
    string.trim().toLowerCase().includes(
      prefix.trim().toLowerCase()
    )
  )

  const search = data => (
    data.filter(({ name, email }) => (
      searchBy(name) || searchBy(email.split('@')[0])
    ))
  )

  return { prefix, setPrefix, search }
}

export default useSearch