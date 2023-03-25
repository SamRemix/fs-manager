import { memo, useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

// import pages
import Home from './pages/Home'
import MyFiles from './pages/MyFiles'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import UserProfile from './pages/UserProfile'

// import components
import Layout from './components/Layout'

import { AuthContext } from './contexts/AuthContext'

const App = () => {
  const location = useLocation()

  const { token, user } = useContext(AuthContext)

  return (
    <>
      <Layout />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route path="/my-files" element={<MyFiles />} />

        <Route path="/sign-up" element={!token ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/log-in" element={!token ? <LogIn /> : <Navigate to="/" />} />

        <Route path="/user-profile" element={user && <UserProfile />} />
      </Routes>
    </>
  )
}

export default memo(App)
