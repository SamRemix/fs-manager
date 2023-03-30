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
import Toasts from './components/Toasts'

import { AuthContext } from './contexts/AuthContext'

import useFetch from './hooks/useFetch'
import { AnimatePresence, LayoutGroup } from 'framer-motion'

const App = () => {
  const location = useLocation()

  const { token } = useContext(AuthContext)

  useFetch({ method: 'get', url: '/users' })

  return (
    <>
      <LayoutGroup>
        <Layout />

        {/* <Toasts /> */}

        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />

            <Route path="/my-files" element={token && <MyFiles />} />

            <Route path="/sign-up" element={!token ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/log-in" element={!token ? <LogIn /> : <Navigate to="/" />} />

            <Route path="/user-profile/:id/*" element={token && <UserProfile />} />
          </Routes>
        </AnimatePresence>
      </LayoutGroup>
    </>
  )
}

export default memo(App)
