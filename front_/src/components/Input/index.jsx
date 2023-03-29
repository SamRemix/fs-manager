import './styles.scss'

import { memo, useState } from 'react'

import Icon from '../Icon'

import useVerifyPassword from '../../hooks/useVerifyPassword'

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  maxLength,
  autoFocus,
  error,
  setPrefix,
  isNew,
}) => {
  // hide - show password
  const [isDisplay, setIsDisplay] = useState(false)

  const { verify } = useVerifyPassword()

  return (
    <div className={error ? 'input--error' : 'input'}>
      {type === 'text' && (
        <>
          <p className="title">{placeholder}</p>

          <input
            placeholder={error || placeholder}
            value={error ? '' : value}
            onChange={onChange}
            maxLength={maxLength}
            autoFocus={autoFocus}
          />

          {maxLength && <p>remaining: {maxLength - value.length}</p>}
        </>
      )}

      {type === 'textarea' && (
        <>
          <p className="title">{placeholder}</p>

          <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </>
      )}

      {type === 'search' && (
        <>
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={({ target }) => setPrefix(target.value)}
          />

          <div className="search-icon">
            <Icon icon="MagnifyingGlassIcon" />
          </div>
        </>
      )}

      {type === 'password' && (
        <>
          <p className="title">{placeholder}</p>

          <div className="input-content">
            <input
              type={isDisplay ? 'text' : 'password'}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />

            <div
              className="eye-icon"
              onClick={() => setIsDisplay(!isDisplay)}>
              <Icon icon={isDisplay ? 'EyeSlashIcon' : 'EyeIcon'} />
            </div>
          </div>

          {isNew && (
            <>
              <p>Password must contain :</p>

              <ul>
                {verify(value).map(({ condition, isValid }, i) => (
                  <li key={i}>
                    <Icon
                      icon={isValid ? 'CheckBadgeIcon' : 'XMarkIcon'}
                      attr={{
                        stroke: !isValid && '#ff3e00',
                        strokeWidth: !isValid && 2.5
                      }}
                    />

                    <p>At least {condition}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default memo(Input)