import { memo } from 'react'

import { motion } from 'framer-motion'
import { animation } from './motion.config'

const PageTitle = ({ children }) => (
  <motion.h1 {...animation}>{children}</motion.h1>
)

export default memo(PageTitle)