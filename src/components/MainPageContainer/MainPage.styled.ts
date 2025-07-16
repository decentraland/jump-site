import styled from '@emotion/styled'
import { Box, type Theme } from 'decentraland-ui2'
import backgroundImage from '../../assets/background.webp'

export const MainPageContainer = styled(Box)(props => {
  const theme = props.theme as Theme
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)',
    padding: 32,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 'calc(100vh - 210px)',
      alignItems: 'stretch',
      width: 'auto',
      margin: 0,
      padding: 0,
      overflowX: 'hidden'
    }
  }
})
