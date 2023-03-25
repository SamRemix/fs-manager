import { memo } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

// import pages
import Home from './pages/Home'
import MyFiles from './pages/MyFiles'
import SignUp from './pages/SignUp'

// import components
import Layout from './components/Layout'

const App = () => {
  const location = useLocation()

  return (
    <>
      <Layout />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route path="/my-files" element={<MyFiles />} />

        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default memo(App)
