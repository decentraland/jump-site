import styled from '@emotion/styled'

export const TextWrapperContainer = styled('div')<{
  $maxHeight: number
  $hasGradient: boolean
  $gradientColor: string
}>(({ $maxHeight, $hasGradient, $gradientColor }) => ({
  position: 'relative',
  height: `${$maxHeight}px`,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 3,
    height: 24,
    background: `linear-gradient(transparent, ${$gradientColor})`,
    pointerEvents: 'none',
    zIndex: 1,
    opacity: $hasGradient ? 1 : 0,
    transition: 'opacity 0.2s ease'
  }
}))

export const TextContent = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: 'auto',
  paddingRight: 4,
  '&::-webkit-scrollbar': {
    width: 3,
    opacity: 0,
    transition: 'opacity 0.2s ease'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
    borderRadius: 2
  },
  '&:hover': {
    '&::-webkit-scrollbar': {
      opacity: 1
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      }
    }
  }
})
