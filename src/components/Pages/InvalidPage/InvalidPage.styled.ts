import styled from '@emotion/styled'
import { Box } from 'decentraland-ui2'
import backgroundInvalidEventImage from '../../../assets/background-invalid-events-page.webp'
import backgroundInvalidPlaceImage from '../../../assets/background-invalid-places-page.webp'
import { MainPageContainer } from '../../MainPageContainer/MainPage.styled'

export const InvalidPageContainer = styled(MainPageContainer)<{ isEventPage: boolean; isMobile: boolean }>(({ isEventPage, isMobile }) => {
  const backgroundImage = isEventPage ? backgroundInvalidEventImage : backgroundInvalidPlaceImage
  const linearGradient = isMobile
    ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))'
    : 'linear-gradient(104.62deg, #7106A0 17.97%, rgba(113, 6, 160, 0) 75.95%)'
  return {
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `${linearGradient}, url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '@media (max-width: 600px)': {
      justifyContent: 'flex-start',
      padding: '50px 18px 0 18px'
    }
  }
})

export const ContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '24px',
  padding: '48px',
  backgroundColor: '#36044CF2',
  width: '691px',
  '@media (max-width: 600px)': {
    width: '100%',
    padding: '48px 24px',
    alignSelf: 'center'
  }
})

export const MobileActionsContainer = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 24,
  background: 'linear-gradient(100.12deg, #130119 0%, #320524 100%)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'none',
  '@media (max-width: 600px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
})
