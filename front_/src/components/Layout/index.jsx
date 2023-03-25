import './styles.scss'

import { memo, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import useLogOut from '../../hooks/useLogOut'

import SearchBar from '../SearchBar'
import Button from '../Button'

import displayIcon from '../../utils/displayIcon'

import { links, isLogOut } from './links'

const Layout = () => {
  const { token, user } = useContext(AuthContext)

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

        <SearchBar />

        <ul className="header-items">
          {!token ? (
            displayLinks(isLogOut)
          ) : (
            <>
              <li className="item" onClick={disconnect} style={{ cursor: 'pointer' }}>
                <div className="link">
                  {displayIcon('ArrowLeftOnRectangleIcon', { className: 'link-icon' })}

                  <p className="link-title">Log out</p>
                </div>
              </li>
              <li className={`/user-profile/${user._id}` === pathname ? 'item-active' : 'item'}>
                <NavLink to={`/user-profile/${user._id}`} className="link">
                  {/* icon will be replaced by the profile picture */}
                  {displayIcon('UserCircleIcon', { className: 'link-icon' })}

                  <p className="link-title">Profile</p>
                </NavLink>
              </li>
            </>
          )}

          {(exists(isLogOut) || `/user-profile/${user?._id}` === pathname) && (
            <div className="focus" />
          )}
        </ul>
      </header>

      <div className="previous-page">
        <Button className="back" />
      </div>

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