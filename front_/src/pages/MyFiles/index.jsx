import { memo } from 'react'

import PageTitle from '../../components/PageTitle'

const MyFiles = () => {
  return (
    <section className="container">
      <PageTitle>My files</PageTitle>
    </section >
  )
}

export default memo(MyFiles)