import './styles.scss'

import { memo } from 'react'

import displayIcon from '../../utils/displayIcon'

const Modal = ({ children, type = 'default', onClick, timeOut = false }) => {
  return (
    <div className={`modal ${type}`}>
      <div className="modal-backdrop" onClick={onClick} />
      <div className="modal-content">
        {displayIcon('XMarkIcon', {
          className: 'close-button',
          onClick: onClick
        })}
        {children}
      </div>
    </div>
  )
}

export default memo(Modal)