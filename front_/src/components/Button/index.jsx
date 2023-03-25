import './styles.scss'

import { memo } from 'react'

import { useNavigate } from 'react-router-dom'

import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'

const Button = ({ children, className = 'primary', event = null }) => {
  const navigate = useNavigate()
  return (
    <>
      {className !== 'back' && (
        <button
          {...className}
          onClick={event}>
          {children}
        </button>
      )}

      {className === 'back' && (
        <button
          className="secondary"
          onClick={() => navigate(-1)}>
          <ArrowLongLeftIcon width="2em" />
          Back
        </button>
      )}
    </>
  )
}

export default memo(Button)