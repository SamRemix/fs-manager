import './styles.scss'

import { memo, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import useLogOut from '../../hooks/useLogOut'

import displayIcon from '../../utils/displayIcon'

import { links, authLinks, logOut } from './links'

const Layout = () => {
  const { token, dispatch } = useContext(AuthContext)

  const { pathname } = useLocation()

  const { disconnect } = useLogOut()

  // checks if links includes pathname and then returns 'focus' in the jsx
  const exists = links => (
    links.some(({ path }) => path === pathname)
  )

  // create a function that returns jsx to display links (used in header & navbar)
  const displayLinks = links => (
    links.map(({ id, path, name, icon }) => (
      <li className={path === pathname ? 'item-active' : 'item'} key={id}>
        <NavLink to={path} className="link">
          {displayIcon(icon, { className: 'link-icon' })}

          <p className="link-title">{name}</p>
        </NavLink>
      </li>
    ))
  )

  return (
    <>
      <header className="header">
        <h1 className="header-title">
          {'Cloud_remix'.split('_').map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </h1>

        <ul className="header-items">
          {!token ? (
            displayLinks(authLinks)
          ) : (
            <li
              className="item"
              key={logOut.id}
              onClick={disconnect}>
              <div className="link" style={{ cursor: 'pointer' }}>
                {displayIcon(logOut.icon, { className: 'link-icon' })}

                <p className="link-title">{logOut.name}</p>
              </div>
            </li>
          )}

          {exists(authLinks) && <div className="focus" />}
        </ul>
      </header>

      <nav className="navbar">
        <ul className="navbar-items">
          {displayLinks(links)}

          {exists(links) && <div className="focus" />}
        </ul>
      </nav>
    </>
  )
}

export default memo(Layout)