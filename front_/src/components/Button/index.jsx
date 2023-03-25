import './styles.scss'

import { memo } from 'react'

import { useNavigate } from 'react-router-dom'

import displayIcon from '../../utils/displayIcon'

const Button = ({ children, className = 'primary', onClick = null }) => {
  const navigate = useNavigate()

  return (
    <button
      className={className}
      onClick={className === 'previous' ? () => navigate(-1) : onClick}>
      {className === 'previous' ? (
        <>
          {displayIcon('ArrowLongLeftIcon', { width: '2em' })}
          Previous
        </>
      ) : children}
    </button>
  )
}

export default memo(Button)