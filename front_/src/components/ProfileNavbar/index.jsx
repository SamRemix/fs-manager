// import './styles.scss'

import { memo, useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import Icon from '../Icon'

const ProfileNavbar = () => {
  const { user: currentUser } = useContext(AuthContext)

  const { pathname } = useLocation()
  const { id } = useParams()

  let linkId = 1
  const currentUserLinks = [
    {
      id: linkId++,
      name: 'Details',
      // path: `/user-profile/${id}`,
      icon: 'IdentificationIcon',
    },
    {
      id: linkId++,
      name: 'Password',
      // path: `/user-profile/${id}/password`,
      icon: 'LockClosedIcon',
    },
    {
      id: linkId++,
      name: 'Settings',
      // path: `/user-profile/${id}/settings`,
      icon: 'Cog6ToothIcon',
    }
  ]

  const defaultLinks = [
    {
      id: linkId++,
      name: 'Details',
      // path: `/user-profile/${id}`,
      icon: 'IdentificationIcon',
    },
    {
      id: linkId++,
      name: 'Shared files',
      // path: `/user-profile/${id}/shared-files`,
      icon: 'FolderOpenIcon',
    }
  ]

  const links = currentUser._id === id ? currentUserLinks : defaultLinks

  return (
    <nav className="navbar-profile">
      <ul className="navbar-profile-items">
        {links.map(({ id, path, name, icon }) => (
          <li className={path === pathname ? 'item-active' : 'item'} key={id}>
            <Link to={path} className="link">
              <Icon icon={icon} />

              <p className="link-title">{name}</p>
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