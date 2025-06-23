import styled from '@emotion/styled'
import { type Theme } from '@mui/material'

export const CardContainer = styled('div')(props => {
  const theme = props.theme as Theme
  return {
    display: 'flex',
    height: 608,
    width: '100%',
    minWidth: 1118,
    maxWidth: 1448,
    overflow: 'hidden',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    backgroundColor: '#380A4D',
    [theme.breakpoints.down('md')]: {
      height: 490,
      width: '100%',
      margin: '0 32px'
    }
  }
})

export const LeftSection = styled('div')(props => {
  const theme = props.theme as Theme
  return {
    position: 'relative',
    flexGrow: 1,
    maxWidth: 724,
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      height: '100%'
    }
  }
})

export const RightSection = styled('div')(props => {
  const theme = props.theme as Theme
  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: 1,
    maxWidth: 724,
    padding: '60px 60px 48px 48px',
    [theme.breakpoints.down('md')]: {
      padding: 20
    },
    [theme.breakpoints.down('sm')]: {
      padding: 16
    }
  }
})

export const CardImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center'
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
      fontSize: 40
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 32
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

export const CardDate = styled('div')<{ eventHasEnded: boolean }>(({ eventHasEnded }) => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    gap: '8px',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.75,
    letterSpacing: 0,
    color: eventHasEnded ? '#fcfcfc' : '#ffffff',
    backgroundColor: eventHasEnded ? '#716B7C' : '#00000066',
    textTransform: eventHasEnded ? 'uppercase' : 'none',
    borderRadius: '8px',
    backdropFilter: 'blur(4px)',
    width: 'fit-content'
  }
})

export const CardLocation = styled('div')({
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

export const CardDescription = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  fontSize: 20,
  color: '#ffffff',
  lineHeight: 1.6,
  letterSpacing: 0,
  margin: 0,
  overflowY: 'auto',
  paddingRight: 4,
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
  }
})

export const CardLoadingContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: '#f3f4f6'
})

export const CreatorAvatar = styled('img')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
  flexShrink: 0,
  objectFit: 'cover',
  width: 32,
  height: 32,
  overflow: 'hidden',
  borderRadius: '33.65px',
  borderWidth: '2.29px',
  borderStyle: 'solid',
  borderColor: '#ffffff'
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
