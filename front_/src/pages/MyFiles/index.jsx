import { memo } from 'react'

import PageTitle from '../../components/PageTitle'

const MyFiles = () => {
  return (
    <section className="container" style={{ height: '150vh' }}>
      <PageTitle>My files</PageTitle>
    </section >
  )
}

export default memo(MyFiles)