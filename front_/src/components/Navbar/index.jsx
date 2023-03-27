// styles.scss is in Layout folder

import { memo, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import displayIcon from '../../utils/displayIcon'

import { links } from './links'

const Navbar = () => {
  const { token } = useContext(AuthContext)

  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <ul className="navbar-items">
        {links.map(({ id, path, name, icon, isConnected }) => (
          ((isConnected && token) || !isConnected) && (
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
    </nav>
  )
}

export default memo(Navbar)