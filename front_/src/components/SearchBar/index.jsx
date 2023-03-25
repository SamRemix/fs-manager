import './styles.scss'

import { memo, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UsersContext } from '../../contexts/UsersContext'

import useSearch from '../../hooks/useSearch'

import Input from '../Input'

const SearchBar = () => {
  const { users } = useContext(UsersContext)

  const { prefix, setPrefix, search } = useSearch()

  return (
    <div className="searchbar-container">
      <Input type="search" value={prefix} setPrefix={setPrefix} />

      {prefix && (
        <div className="results">
          {users && search(users).map(({ _id, name, email }) => (
            <div className="results-item">
              <Link key={_id} to={`user-profile/${_id}`} onClick={() => setPrefix('')}>
                <p className="results-item-name">{name}</p>
                <p className="results-item-email">{email}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(SearchBar)