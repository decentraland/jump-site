import styled from '@emotion/styled'
import { type Theme } from '@mui/material'

export const CardContainer = styled('div')(props => {
  const theme = props.theme as Theme
  return {
    display: 'flex',
    height: 608,
    width: 1448,
    overflow: 'hidden',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    backgroundColor: '#380A4D',
    [theme.breakpoints.down('md')]: {
      width: 'calc(100vw - 32px)',
      height: 280,
      margin: '0 16px'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 400,
      width: 'calc(100vw - 24px)',
      margin: '0 12px'
    }
  }
})

export const LeftSection = styled('div')(props => {
  const theme = props.theme as Theme
  return {
    position: 'relative',
    width: 724,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 200
    }
  }
})

export const RightSection = styled('div')(props => {
  const theme = props.theme as Theme
  return {
    width: 724,
    padding: '60px 60px 48px 48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      padding: 20
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: 16
    }
  }
})

export const CardImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'fill',
  objectPosition: 'center',
  transition: 'transform 0.3s ease'
})

export const AttendeesBadge = styled('div')<{ backgroundColor?: string }>(({ backgroundColor = '#FF2D55' }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  backgroundColor,
  color: '#161518',
  padding: '8px 16px',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  fontWeight: 700,
  backdropFilter: 'blur(4px)'
}))

export const CardContent = styled('div')({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  gap: 12,
  marginBottom: 30
})

export const CardTitle = styled('h2')(props => {
  const theme = props.theme as Theme
  return {
    fontSize: 48,
    fontWeight: 600,
    margin: 0,
    color: '#ffffff',
    lineHeight: 1.17,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      fontSize: 24
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 20
    }
  }
})

export const CardCreator = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 20,
  fontWeight: 500,
  color: '#FF2D55',
  marginBottom: '24px'
})

export const CreatorLabel = styled('span')({
  color: '#ffffff'
})

export const CardDate = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 8px',
  gap: '8px',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.75,
  letterSpacing: 0,
  color: '#ffffff',
  backgroundColor: '#00000066',
  borderRadius: '8px',
  backdropFilter: 'blur(4px)',
  width: 'fit-content'
})

export const CardLocation = styled('div')({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 8px 4px 8px',
  gap: '8px',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.75,
  letterSpacing: 0,
  color: '#ffffff',
  backgroundColor: '#00000066',
  borderRadius: '8px',
  backdropFilter: 'blur(4px)',
  width: 'fit-content'
})

export const CardDescription = styled('div')(props => {
  const theme = props.theme as Theme
  return {
    position: 'relative',
    fontSize: 20,
    color: '#ffffff',
    lineHeight: 1.6,
    letterSpacing: 0,
    margin: 0,
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    maxHeight: '128px', // 4 lines * 32px (20px font + 1.6 line-height)
    overflowY: 'auto',
    paddingRight: 4, // Space for scrollbar
    '&::-webkit-scrollbar': {
      width: 4,
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
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 24,
      background: 'linear-gradient(transparent, #380A4D)',
      pointerEvents: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      maxHeight: '115.2px' // Adjust for smaller font
    }
  }
})

export const LoadingContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: '#f3f4f6'
})

// Icon components using simple SVG paths or Unicode symbols
export const DateIcon = styled('span')({
  fontSize: 16,
  '&::before': {
    content: '"📅"'
  }
})

export const CreatorAvatar = styled('img')({
  width: 32,
  height: 32,
  borderRadius: '33.65px',
  borderWidth: '2.29px',
  borderStyle: 'solid',
  borderColor: '#ffffff',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
  flexShrink: 0,
  objectFit: 'cover'
})

export const UserProfileLink = styled('a')({
  color: '#FF2D55',
  textDecoration: 'none',
  fontSize: 20,
  fontWeight: 500,
  transition: 'color 0.2s ease, text-decoration 0.2s ease',
  '&:hover': {
    color: '#FF4D75',
    textDecoration: 'underline'
  },
  '&:focus': {
    outline: '2px solid #FF2D55',
    outlineOffset: 2,
    borderRadius: 4
  }
})

// Legacy exports for backward compatibility
export const ImageContainer = LeftSection
export const Image = CardImage
export const Content = RightSection
export const Text = CardContent
export const Title = CardTitle
export const Subtitle = CardCreator
