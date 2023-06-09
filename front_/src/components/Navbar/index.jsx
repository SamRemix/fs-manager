// styles.scss is in Layout folder

import { memo, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { motion } from 'framer-motion'
import { animation } from './motion.config'

import { AuthContext } from '../../contexts/AuthContext'

import Icon from '../Icon'

import { links } from './links'

const Navbar = () => {
  const { token } = useContext(AuthContext)

  const { pathname } = useLocation()

  return (
    <motion.nav className="navbar" {...animation}>
      <ul className="navbar-items">
        {links.map(({ id, path, name, icon, isConnected }) => (
          ((isConnected && token) || !isConnected) && (
            <li className={path === pathname ? 'item-active' : 'item'} key={id}>
              <Link to={path} className="link">
                <Icon icon={icon} />

                <p className="link-title">{name}</p>
              </Link>
            </li>
          )
        ))}

        {links.some(({ path }) => path === pathname) && (
          <div className="focus" />
        )}
      </ul>
    </motion.nav>
  )
}

export default memo(Navbar)