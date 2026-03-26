import styled from '@emotion/styled'

export const Container = styled('div')<{ size: 'small' | 'large' }>(({ size }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: size === 'small' ? 12 : 16,
  width: '100%'
}))

export const BadgeLink = styled('a')<{ size: 'small' | 'large' }>(({ size }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease',
  maxWidth: size === 'small' ? 160 : 200,
  '& img': {
    width: '100%',
    height: 'auto'
  },
  '&:hover': {
    opacity: 0.85
  }
}))
