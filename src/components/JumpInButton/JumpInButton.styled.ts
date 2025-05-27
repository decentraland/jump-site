import styled from '@emotion/styled'
import { Button, type Theme } from 'decentraland-ui2'

type ButtonSize = 'tiny' | 'medium' | 'large' | 'full'

interface StyledJumpInButtonProps {
  buttonSize?: ButtonSize
}

export const StyledJumpInButton = styled(Button)<StyledJumpInButtonProps>(({ buttonSize = 'large', theme }) => {
  const muiTheme = theme as Theme

  const styles = {
    tiny: {
      width: 24,
      height: 24,
      minWidth: 24,
      borderRadius: '50%',
      padding: '0 !important'
    },
    medium: {
      width: 200,
      height: 40
    },
    large: {
      width: 300,
      height: 40,
      [muiTheme.breakpoints.down('xs')]: {
        width: 200
      }
    },
    full: {
      width: '100%',
      height: '100%'
    }
  }

  return styles[buttonSize]
})

interface JumpInIconProps {
  iconSize?: ButtonSize
}

export const JumpInIcon = styled('svg')<JumpInIconProps>(({ iconSize = 'large' }) => {
  const iconSizes = {
    tiny: { width: 20, height: 20 },
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

export const ButtonContainer = styled('div')<{ containerSize?: ButtonSize }>(({ containerSize = 'large' }) => ({
  marginBottom: containerSize === 'tiny' ? 0 : 32
}))
