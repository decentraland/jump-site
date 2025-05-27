import { FC, memo } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import { Button, Typography, useMobileMediaQuery } from 'decentraland-ui2'
import { config } from '../../../config'
import { useFormatMessage } from '../../../hooks/useFormatMessage'
import { JumpInButton } from '../../JumpInButton'
import { LinkButton } from '../../LinkButton'
import { InvalidPageContainer, ContentBox, MobileActionsContainer } from './InvalidPage.styled'

export const InvalidPage: FC<{ isEventPage: boolean }> = memo(({ isEventPage }) => {
  const formatMessage = useFormatMessage()
  const isMobile = useMobileMediaQuery()

  return (
    <InvalidPageContainer isEventPage={isEventPage} isMobile={isMobile}>
      <ContentBox>
        <Typography variant="h3" mb="24px">
          {formatMessage('invalid_page.title')}
        </Typography>
        <Typography variant="h6" mb="48px">
          {formatMessage('invalid_page.message')}
        </Typography>
        {!isMobile ? (
          <JumpInButton position="0,0" size="large" fullWidth sx={{ marginBottom: '16px' }}>
            {formatMessage('invalid_page.jump_in_button')}
          </JumpInButton>
        ) : null}
        {isEventPage ? (
          <Button
            variant="contained"
            color="secondary"
            href={config.get('EVENTS_URL')}
            size="large"
            fullWidth
            sx={{ marginBottom: '16px' }}
          >
            {formatMessage('invalid_page.explore_events')}
          </Button>
        ) : null}
        <Typography variant={isMobile ? 'h6' : 'subtitle1'} color="white" textAlign="center">
          {formatMessage('invalid_page.learn_more', {
            a: (text: string) => (
              <LinkButton variant="text" color="primary" href={config.get('HOME_URL')} target="_blank" rel="noopener noreferrer">
                <Typography variant={isMobile ? 'h6' : 'subtitle1'}>{text}</Typography>
              </LinkButton>
            )
          })}
        </Typography>
      </ContentBox>
      {isMobile && (
        <MobileActionsContainer>
          <Button variant="contained" color="primary" href={config.get('HOME_URL')} size="large" fullWidth startIcon={<HomeIcon />}>
            {formatMessage('invalid_page.go_home_button')}
          </Button>
        </MobileActionsContainer>
      )}
    </InvalidPageContainer>
  )
})
