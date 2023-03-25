import './styles.scss'

import { memo, useState } from 'react'

import displayIcon from '../../utils/displayIcon'

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
            <p className="remaining">remaining: {maxLength - value.length}</p>
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

      {type === ('checkbox' || 'radio' || 'range') && (
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
      )}

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
            {displayIcon('MagnifyingGlassIcon')}
          </div>
        </>
      )}

      {type === 'password' && (
        <>
          <input
            type={isDisplay ? 'text' : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            key={key}
          />

          <div
            className="eye-icon"
            onClick={() => setIsDisplay(!isDisplay)}>
            {displayIcon(isDisplay ? 'EyeSlashIcon' : 'EyeIcon')}
          </div>
        </>
      )}
    </div>
  )
}

export default memo(Input)