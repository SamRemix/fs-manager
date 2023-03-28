import './styles.scss'

import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import { animation } from './motion.config'

import Icon from '../Icon'

const Button = ({ children, className = 'primary', onClick = null }) => {
  const navigate = useNavigate()

  const isAnimate = className === 'back' && animation

  return (
    <motion.button
      className={className}
      onClick={className === 'back' ? () => navigate(-1) : onClick}
      // style={{ zIndex: className === 'back' && 2 }}
      {...isAnimate}>
      {className === 'back' ? (
        <>
          <Icon icon="ArrowLongLeftIcon" attr={{ width: '2rem' }} />
          Back
        </>
      ) : children}
    </motion.button>
  )
}

export default memo(Button)