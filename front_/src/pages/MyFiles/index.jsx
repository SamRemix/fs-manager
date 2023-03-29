import { memo } from 'react'

import PageTitle from '../../components/PageTitle'

import setDocumentTitle from '../../utils/setDocumentTitle'

const MyFiles = () => {
  setDocumentTitle('My files')

  return (
    <section className="container">
      <PageTitle>My files</PageTitle>
    </section >
  )
}

export default memo(MyFiles)