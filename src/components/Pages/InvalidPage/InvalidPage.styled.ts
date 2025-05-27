import styled from '@emotion/styled'
import backgroundInvalidEventImage from '../../../assets/background-invalid-events-page.png'
import backgroundInvalidPlaceImage from '../../../assets/background-invalid-places-page.png'
import { MainPageContainer } from '../../MainPageContainer/MainPage.styled'

export const InvalidPageContainer = styled(MainPageContainer)<{ isEventPage: boolean }>(({ isEventPage }) => {
  const backgroundImage = isEventPage ? backgroundInvalidEventImage : backgroundInvalidPlaceImage
  return {
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `linear-gradient(104.62deg, #7106A0 17.97%, rgba(113, 6, 160, 0) 75.95%), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
})
