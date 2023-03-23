import { memo } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

// import pages
import Home from './pages/Home'
import MyFiles from './pages/MyFiles'

// import components
import Navbar from './components/Navbar'

const App = () => {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/my-files" element={<MyFiles />} />
      </Routes>
    </>
  )
}

export default memo(App)
