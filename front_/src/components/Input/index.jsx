import './styles.scss'

import { memo, useState } from 'react'

import {
  MagnifyingGlassIcon, // Search icon
  EyeSlashIcon, // Hide password icon
  EyeIcon // Display password icon
} from '@heroicons/react/24/outline'

const Input = ({
  type = 'text',
  placeholder,
  value,
  checked,
  onChange,
  maxLength,
  focus,
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
            autoFocus={focus}
            key={key}
          />

          {maxLength && (
            <p className="remaining">
              {maxLength - value.length} remaining character{value.length < maxLength - 1 && 's'}.
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

      {type === 'checkbox' && (
        <label className={checked ? 'checkbox-checked' : 'checkbox'}>
          <input
            type={type}
            checked={checked}
            onChange={onChange}
            key={key}
          />

          <p>{placeholder}</p>
        </label>
      )}

      {type === 'radio' && (
        <label className={checked ? 'radio-checked' : 'radio'}>
          <input
            type={type}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            key={key}
          />

          <p>{placeholder}</p>
        </label>
      )}

      {type === 'range' && (
        <label className="range">
          <input
            type={type}
            name={name}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
          />
          {value}%
        </label>
      )}

      {type === 'search' && (
        <>
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={e => setPrefix(e.target.value)}
            key={key}
            ref={focus}
          />
          <div className="search-icon">
            <MagnifyingGlassIcon width="1.5em" />
          </div>
        </>
      )}

      {type === 'password' && (
        <>
          <input
            type={isDisplay ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            key={key}
          />
          <div
            className="eye-icon"
            onClick={() => setIsDisplay(!isDisplay)}>
            {isDisplay ? (
              <EyeSlashIcon width="1.5em" />
            ) : (
              <EyeIcon width="1.5em" />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default memo(Input)