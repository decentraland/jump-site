import styled from '@emotion/styled'
import { AttendeesBadge, CardCreator, CardDate, CardDescription, CardLocation, CreatorAvatar, UserProfileLink } from '../Card/Card.styled'

export const MobileCardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  background: 'linear-gradient(96.05deg, #2E013E 36.2%, #7F0D59 100.69%)',
  paddingBottom: '25px'
})

export const MobileTopSection = styled('div')({
  position: 'relative',
  width: '100%',
  height: '250px',
  overflow: 'hidden'
})

export const MobileMiddleSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 24px 0px 24px'
})

export const MobileStickyBottomContainer = styled('div')({
  position: 'fixed',
  bottom: -1,
  left: 0,
  right: 0,
  minHeight: '115px',
  padding: '32px 24px 32px 24px',
  background: 'linear-gradient(100.12deg, #130119 0%, #320524 100%)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.2)'
})

export const MobileAttendeesBadge = styled(AttendeesBadge)(() => ({
  padding: '6px 12px',
  borderRadius: 6,
  gap: 6,
  fontSize: 12
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
  marginBottom: 16
})

export const MobileCardCreator = styled(CardCreator)({
  gap: 6,
  fontSize: 16,
  marginBottom: 16
})

export const MobileCardDate = styled(CardDate)(() => {
  return {
    gap: '6px',
    fontSize: 14,
    lineHeight: 1.5,
    borderRadius: '6px'
  }
})

export const MobileCardLocation = styled(CardLocation)({
  gap: '6px',
  fontSize: 14,
  lineHeight: 1.5,
  borderRadius: '6px'
})

export const MobileCardDescription = styled(CardDescription)({
  fontSize: 16,
  lineHeight: 1.5,
  '&::-webkit-scrollbar': {
    width: 3
  }
})

export const MobileCreatorAvatar = styled(CreatorAvatar)({
  width: 24,
  height: 24,
  borderRadius: '50%',
  borderWidth: '1.5px'
})

export const MobileUserProfileLink = styled(UserProfileLink)({
  fontSize: 16
})
