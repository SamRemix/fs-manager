import './styles.scss'

import { memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { pathname } = useLocation()

  const links = [
    { path: '/', name: 'Home' },
    { path: '/my-files', name: 'My files' },
    { path: '/settings', name: 'Settings' },
  ]

  return (
    <>
      <header>
        <h1 className="title">
          {'Cloud_remix'.split('_').map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </h1>
      </header>

      <nav className="navbar">
        <ul className="navbar-items">
          {links.map(({ path, name }, i) => (
            <li key={i} className={path === pathname ? 'item-active' : 'item'}>
              <NavLink to={path} className="link">
                <p className="link-title">{name}</p>
              </NavLink>
            </li>
          ))}
          <div className="focus" />
        </ul>
      </nav>
    </>
  )
}

export default memo(Navbar)