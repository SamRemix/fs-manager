import './styles.scss'

import { memo, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UsersContext } from '../../contexts/UsersContext'

import useSearch from '../../hooks/useSearch'

import Input from '../Input'

const SearchBar = () => {
  const { users } = useContext(UsersContext)

  const { prefix, setPrefix, search } = useSearch()

  const auth = JSON.parse(localStorage.getItem('auth'))

  return (
    <div className="searchbar-container">
      <Input type="search" value={prefix} setPrefix={setPrefix} />

      {prefix && (
        <div className="results">
          {search(users).map(({ _id, name, email }) => (
            // don't display your own account
            auth?.user.name !== name && (
              <Link
                key={_id}
                className="results-item"
                to={`user-profile/${_id}`}
                onClick={() => setPrefix('')}>
                <p className="results-item-name">{name}</p>
                <p className="results-item-email">{email}</p>
              </Link>
            )
          ))}

          {search(users).length === 0 && (
            <div className="results-item not-found">
              <p className="results-item-name">Not found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(SearchBar)