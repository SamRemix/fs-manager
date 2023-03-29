import './styles.scss'

import { memo, useState } from 'react'

import Icon from '../Icon'
import PasswordVerifier from '../PasswordVerifier'

const Input = ({
  type = 'text',
  placeholder,
  value,
  checked,
  onChange,
  maxLength,
  autoFocus,
  ref,
  error,
  setPrefix,
  key,
  name,
  min,
  max,
  step
}) => {
  // hide - show password
  const [isDisplay, setIsDisplay] = useState(false)

  return (
    <div className={error ? 'input--error' : 'input'}>
      {type === 'text' && (
        <>
          <input
            placeholder={error || placeholder}
            value={error ? '' : value}
            onChange={onChange}
            maxLength={maxLength}
            autoFocus={autoFocus}
            key={key}
          />

          {maxLength && (
            <p className="tips">
              remaining: {maxLength - value.length}
            </p>
          )}
        </>
      )}

      {type === 'textarea' && (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          key={key}
        />
      )}

      {/* {type === ('checkbox' || 'radio' || 'range') && (
        <label className={checked ? `${type}-checked` : type}>
          <input
            type={type}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            key={key}
            min={min}
            max={max}
            step={step}
          />

          {type === 'range' ? <p>{value}%</p> : <p>{placeholder}</p>}
        </label>
      )} */}

      {type === 'search' && (
        <>
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={({ target }) => setPrefix(target.value)}
            key={key}
            ref={ref}
          />

          <div className="search-icon">
            <Icon icon="MagnifyingGlassIcon" />
          </div>
        </>
      )}

      {['password', 'newPassword'].includes(type) && (
        <>
          <div className="input-content">
            <input
              type={isDisplay ? 'text' : 'password'}
              placeholder="password"
              value={value}
              onChange={onChange}
              key={key}
            />

            <div
              className="eye-icon"
              onClick={() => setIsDisplay(!isDisplay)}>
              <Icon icon={isDisplay ? 'EyeSlashIcon' : 'EyeIcon'} />
            </div>
          </div>

          {type === 'newPassword' && (
            <PasswordVerifier password={value} />
          )}
        </>
      )}
    </div>
  )
}

export default memo(Input)