import styled from '@emotion/styled'

export const MobileCardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100dvh',
  background: 'linear-gradient(96.05deg, #2E013E 36.2%, #7F0D59 100.69%)'
})

export const MobileTopSection = styled('div')({
  position: 'relative',
  width: '100%',
  height: '40vh', // 40% of viewport height
  minHeight: '250px',
  overflow: 'hidden'
})

export const MobileMiddleSection = styled('div')({
  flex: 1,
  padding: '20px 24px 120px 24px', // Extra bottom padding for sticky share button
  display: 'flex',
  flexDirection: 'column'
})

export const MobileStickyBottomContainer = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '16px 24px 32px 24px',
  backgroundColor: '#380A4D',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.2)'
})

export const MobileCardImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'fill',
  objectPosition: 'center'
})

export const MobileAttendeesBadge = styled('div')<{ backgroundColor?: string }>(({ backgroundColor = '#FF2D55' }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  backgroundColor,
  color: '#161518',
  padding: '6px 12px',
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12,
  fontWeight: 700,
  backdropFilter: 'blur(4px)'
}))

export const MobileCardContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 12
})

export const MobileCardTitle = styled('h1')({
  fontSize: 28,
  fontWeight: 600,
  margin: 0,
  color: '#ffffff',
  lineHeight: 1.2,
  marginBottom: 8
})

export const MobileCardCreator = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 16,
  fontWeight: 500,
  color: '#FF2D55',
  marginBottom: 8
})

export const MobileCreatorLabel = styled('span')({
  color: '#ffffff'
})

export const MobileCardDate = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 8px',
  gap: '6px',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  color: '#ffffff',
  backgroundColor: '#00000066',
  borderRadius: '6px',
  backdropFilter: 'blur(4px)',
  width: 'fit-content'
})

export const MobileCardLocation = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 8px',
  gap: '6px',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  color: '#ffffff',
  backgroundColor: '#00000066',
  borderRadius: '6px',
  backdropFilter: 'blur(4px)',
  width: 'fit-content'
})

export const MobileCardDescription = styled('div')({
  fontSize: 16,
  color: '#ffffff',
  lineHeight: 1.5,
  letterSpacing: 0,
  margin: 0,
  overflow: 'hidden',
  maxHeight: '96px', // 4 lines * 24px (16px font + 1.5 line-height)
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

export const MobileLoadingContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: '#f3f4f6'
})

export const MobileCreatorAvatar = styled('img')({
  width: 24,
  height: 24,
  borderRadius: '50%',
  borderWidth: '1.5px',
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

export const MobileUserProfileLink = styled('a')({
  color: '#FF2D55',
  textDecoration: 'none',
  fontSize: 16,
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
