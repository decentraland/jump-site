import styled from '@emotion/styled'
import { Box } from 'decentraland-ui2'
import backgroundImage from '../../../assets/background-v4.jpg'

export const MainPageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 'calc(100vh - 64px)',
  paddingTop: 32,
  paddingBottom: 32,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
})
