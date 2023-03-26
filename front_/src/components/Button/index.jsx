import './styles.scss'

import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import displayIcon from '../../utils/displayIcon'

const Button = ({ children, className = 'primary', onClick = null }) => {
  const navigate = useNavigate()

  return (
    <button
      className={className}
      onClick={className === 'back' ? () => navigate(-1) : onClick}>
      {className === 'back' ? (
        <>
          {displayIcon('ArrowLongLeftIcon', { width: '2rem' })}
          Back
        </>
      ) : children}
    </button>
  )
}

export default memo(Button)