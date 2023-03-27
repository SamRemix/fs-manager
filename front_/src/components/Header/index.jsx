// styles.scss is in Layout folder

import { memo, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import useLogOut from '../../hooks/useLogOut'

import SearchBar from '../SearchBar'

import displayIcon from '../../utils/displayIcon'

const Header = () => {
  const { user, token } = useContext(AuthContext)

  const { pathname } = useLocation()

  const { disconnect } = useLogOut()

  let id = 1

  const links = [
    {
      id: id++,
      path: '/sign-up',
      name: 'Sign up',
      icon: 'UserPlusIcon',
      isConnected: false
    }, {
      id: id++,
      path: '/log-in',
      name: 'Log in',
      icon: 'ArrowRightOnRectangleIcon',
      isConnected: false
    }, {
      id: id++,
      path: `/user-profile/${user?._id}`,
      name: 'Profile',
      icon: 'UserCircleIcon',
      isConnected: true
    }
  ]

  return (
    <header className="header">
      <h1 className="header-title">
        {'Cloud_remix'.split('_').map((word, i) => (
          <span key={i}>{word}</span>
        ))}
      </h1>

      <SearchBar />

      <ul className="header-items">
        {token && (
          <li className="item" onClick={disconnect} style={{ cursor: 'pointer' }}>
            <div className="link">
              {displayIcon('ArrowLeftOnRectangleIcon', { className: 'link-icon' })}

              <p className="link-title">Log out</p>
            </div>
          </li>
        )}

        {links.map(({ id, path, name, icon, isConnected }) => (
          ((isConnected && token) || !isConnected && !token) && (
            <li className={path === pathname ? 'item-active' : 'item'} key={id}>
              <Link to={path} className="link">
                {displayIcon(icon, { className: 'link-icon' })}

                <p className="link-title">{name}</p>
              </Link>
            </li>
          )
        ))}

        {links.some(({ path }) => path === pathname) && (
          <div className="focus" />
        )}
      </ul>
    </header>
  )
}

export default memo(Header)