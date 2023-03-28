import './styles.scss'

import { memo } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { animation } from './motion.config'

import useToasts from '../../hooks/useToasts'

import displayIcon from '../../utils/displayIcon'

const Toasts = () => {
  const { toasts, remove } = useToasts()

  return (
    <motion.div className="toasts">
      <AnimatePresence mode="popLayout">
        {toasts.map(({ id, content, type }) => (
          <motion.div
            key={id}
            layoutId={id}
            className={type === 'error' ? 'toast error' : 'toast'}
            {...animation}>
            <p className="content">{content}</p>
            {displayIcon('XMarkIcon', {
              className: 'remove',
              onClick: () => remove(id)
            })}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default memo(Toasts)