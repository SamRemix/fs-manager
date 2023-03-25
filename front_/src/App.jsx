import { memo } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

// import pages
import Home from './pages/Home'
import MyFiles from './pages/MyFiles'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'

// import components
import Layout from './components/Layout'

const App = () => {
  const location = useLocation()

  const token = localStorage.getItem('token')

  return (
    <>
      <Layout />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route path="/my-files" element={<MyFiles />} />

        <Route path="/sign-up" element={!token ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/log-in" element={!token ? <LogIn /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default memo(App)
