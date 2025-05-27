import styled from '@emotion/styled'
import { Button, type Theme } from 'decentraland-ui2'

export const ShareLinkContainer = styled('div')(props => {
  const theme = props.theme as Theme
  return {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '16px 24px 32px 24px',
    backgroundColor: '#380A4D',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
    display: 'none', // Hidden by default
    [theme.breakpoints.down('md')]: {
      display: 'block' // Show only on mobile/tablet
    }
  }
})

export const ShareLinkButton = styled(Button)({
  backgroundColor: '#FF2D55',
  color: '#ffffff',
  borderRadius: '12px',
  height: '56px',
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 16px rgba(255, 45, 85, 0.3)',
  border: 'none',
  '&:hover': {
    backgroundColor: '#E02347',
    boxShadow: '0 6px 20px rgba(255, 45, 85, 0.4)'
  },
  '&:focus': {
    backgroundColor: '#E02347',
    boxShadow: '0 6px 20px rgba(255, 45, 85, 0.4)',
    outline: '2px solid #ffffff',
    outlineOffset: '2px'
  },
  '&:active': {
    backgroundColor: '#C01E3F',
    transform: 'translateY(1px)'
  },
  '& .MuiButton-startIcon': {
    marginRight: '8px',
    '& svg': {
      fontSize: '20px'
    }
  }
})
