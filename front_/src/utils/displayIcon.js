import { createElement } from 'react'

import * as Heroicons from '@heroicons/react/24/outline'

const displayIcon = (icon, attr = { width: '1.5rem' }) => (
  createElement(Heroicons[icon], attr)
)

export default displayIcon