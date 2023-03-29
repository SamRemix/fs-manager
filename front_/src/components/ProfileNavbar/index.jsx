import './styles.scss'

import { memo } from 'react'
import { useLocation } from 'react-router-dom'

import Icon from '../Icon'

const ProfileNavbar = () => {
  const { pathname } = useLocation()

  let id = 1
  const links = [
    {
      id: id++,
      name: 'Details',
      icon: 'IdentificationIcon',
    },
    {
      id: id++,
      name: 'Password',
      icon: 'LockClosedIcon',
    },
  ]

  return (
    <nav className="navbar-profile">
      <ul className="navbar-profile-items">
        {links.map(({ id, path, name, icon }) => (
          <li className={path === pathname ? 'item-active' : 'item'} key={id}>
            <Icon icon={icon} />

            <p className="item-title">{name}</p>
          </li>
        ))}

        {links.some(({ path }) => path === pathname) && (
          <div className="focus" />
        )}
      </ul>
    </nav>
  )
}

export default memo(ProfileNavbar)