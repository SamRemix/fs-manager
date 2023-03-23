import './styles.scss'

import { memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { links, authLinks } from './links'

const Navbar = () => {
  const { pathname } = useLocation()

  // checks if links includes pathname and then returns 'focus' in the jsx
  const exists = links => (
    links.some(({ path }) => path === pathname)
  )

  // create a function that returns jsx to display links (used in header & navbar)
  const displayLinks = links => (
    links.map(({ id, path, name }) => (
      <li className={path === pathname ? 'item-active' : 'item'} key={id}>
        <NavLink to={path} className="link">
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
          {displayLinks(authLinks)}

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

export default memo(Navbar)