import { memo, createElement } from 'react'

import * as Heroicons from '@heroicons/react/24/outline'

const Icon = ({ icon, attr }) => (
  createElement(Heroicons[icon], {
    className: attr?.className,
    width: attr?.width || '1.5rem',
    stroke: attr?.stroke || 'currentColor',
    strokeWidth: attr?.strokeWidth || 1.5,
    onClick: attr?.onClick
  })
)

export default memo(Icon)