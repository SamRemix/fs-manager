import { memo } from 'react'

import useFetch from '../../hooks/useFetch'

const MyFiles = () => {
  const { response: user } = useFetch({
    method: 'get',
    url: '/users/6414e71e0260ee2f310fca82'
  })

  return (
    <section className="container">
      <h1>My files</h1>
    </section>
  )
}

export default memo(MyFiles)