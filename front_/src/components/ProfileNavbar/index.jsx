import './styles.scss'

import { memo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import Icon from '../Icon'

const ProfileNavbar = () => {
  const { pathname } = useLocation()
  const { id } = useParams()

  let linkId = 1
  const links = [
    {
      id: linkId++,
      name: 'Details',
      path: `/user-profile/${id}`,
      icon: 'IdentificationIcon',
    },
    {
      id: linkId++,
      name: 'Password',
      path: `/user-profile/${id}/password`,
      icon: 'LockClosedIcon',
    },
  ]

  return (
    <nav className="navbar-profile">
      <ul className="navbar-profile-items">
        {links.map(({ id, path, name, icon }) => (
          <li className={path === pathname ? 'item-active' : 'item'} key={id}>
            <Link to={path} className="link">
              <Icon icon={icon} />

              <p className="item-title">{name}</p>
            </Link>
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