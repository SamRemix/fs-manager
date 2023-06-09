import './styles.scss'

import { memo } from 'react'

import Header from '../Header'
import Navbar from '../Navbar'
import Button from '../Button'

const Layout = () => {
  return (
    <>
      <Header />

      <Button className="back" />

      <Navbar />
    </>
  )
}

export default memo(Layout)