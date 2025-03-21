import { type FC } from 'react'
import classNames from 'classnames'
import { Box } from 'decentraland-ui2'
import { Props } from './PageLayout.types'
import styles from './PageLayout.module.css'

export const PageLayout: FC<Props> = ({ children, className }: Props) => {
  return <Box className={classNames(styles.page, className)}>{children}</Box>
}
