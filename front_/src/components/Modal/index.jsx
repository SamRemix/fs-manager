import './styles.scss'

import { memo } from 'react'

import displayIcon from '../../utils/displayIcon'

const Modal = ({ children, type = 'default', closeEvent }) => {
  return (
    <div className={`modal ${type}`}>
      {type === 'default' && (
        <div className="modal-backdrop" onClick={closeEvent} />
      )}
      <div className="modal-content">
        {children}
        {type === 'toast' && (
          displayIcon('XMarkIcon', { className: 'close-button' })
        )}
      </div>
    </div>
  )
}

export default memo(Modal)