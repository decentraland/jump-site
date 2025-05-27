import styled from '@emotion/styled'

export const EventCardActions = styled('div')<{ isMobile?: boolean }>(({ isMobile }) => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  gap: isMobile ? 12 : 16,
  width: '100%',
  marginBottom: isMobile ? 0 : 16,
  alignItems: isMobile ? 'stretch' : 'center'
}))

export const EventCardActionRow = styled('div')<{ isMobile?: boolean }>(({ isMobile }) => ({
  display: 'flex',
  gap: isMobile ? 12 : 16,
  width: '100%',
  alignItems: 'center'
}))

export const EventCardActionButton = styled('div')<{ isMobile?: boolean }>(({ isMobile }) => ({
  flex: isMobile ? '1 1 0%' : 'none', // flex-1 equivalent for mobile
  minWidth: isMobile ? 0 : 'auto' // Allows flex items to shrink below content size on mobile
}))
