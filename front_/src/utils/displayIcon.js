import { createElement } from 'react'

import * as Heroicons from '@heroicons/react/24/outline'

const displayIcon = (icon, attr) => (
  createElement(Heroicons[icon], {
    className: attr?.className,
    width: attr?.width || '1.5rem',
    onClick: attr?.onClick
  })
)

export default displayIcon