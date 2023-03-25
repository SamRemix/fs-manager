import { useState } from 'react'

const useSearch = () => {
  const [prefix, setPrefix] = useState('')

  const search = data => (
    data.filter(({ name }) => (
      name
        .trim()
        .toLowerCase()
        .startsWith(
          prefix
            .trim()
            .toLowerCase()
        )
    ))
  )

  return { prefix, setPrefix, search }
}

export default useSearch