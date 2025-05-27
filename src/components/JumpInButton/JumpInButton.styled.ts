import styled from '@emotion/styled'
import { IconButton, ButtonOwnProps } from 'decentraland-ui2'

export const JumpInIconButton = styled(IconButton)({
  backgroundColor: '#FF2D55',
  border: '1px solid #FCFCFC4D',
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  padding: 0,
  '&:hover': {
    backgroundColor: '#E02347',
    borderColor: '#FCFCFC'
  },
  '&:focus': {
    backgroundColor: '#E02347',
    borderColor: '#FCFCFC'
  }
})

interface JumpInIconProps {
  iconSize?: ButtonOwnProps['size'] | 'tiny' | 'full'
}

export const JumpInIcon = styled('svg')<JumpInIconProps>(({ iconSize = 'large' }) => {
  const iconSizes = {
    tiny: { width: 20, height: 20 },
    small: { width: 22, height: 22 },
    medium: { width: 22, height: 22 },
    large: { width: 24, height: 24 },
    full: { width: '100%', height: '100%' }
  }

  const size = iconSizes[iconSize]

  return {
    width: size.width,
    height: size.height,
    fill: 'none'
  }
})
