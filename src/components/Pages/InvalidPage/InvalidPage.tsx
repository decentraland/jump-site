import { FC, memo } from 'react'
import { Box, Button, Typography } from 'decentraland-ui2'
import { config } from '../../../config'
import { useFormatMessage } from '../../../hooks/useFormatMessage'
import { JumpInButton } from '../../JumpInButton'
import { LinkButton } from '../../LinkButton'
import { InvalidPageContainer } from './InvalidPage.styled'

export const InvalidPage: FC<{ isEventPage: boolean }> = memo(({ isEventPage }) => {
  const formatMessage = useFormatMessage()

  return (
    <InvalidPageContainer isEventPage={isEventPage}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        borderRadius="24px"
        padding="48px"
        bgcolor="#36044CF2"
        width="691px"
      >
        <Typography variant="h3" mb="24px">
          {formatMessage('invalid_page.title')}
        </Typography>
        <Typography variant="h6" mb="48px">
          {formatMessage('invalid_page.message')}
        </Typography>
        <JumpInButton position="0,0" size="large" fullWidth sx={{ marginBottom: '16px' }}>
          {formatMessage('invalid_page.jump_in_button')}
        </JumpInButton>
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
        <Typography variant="subtitle1" color="white" textAlign="center">
          {formatMessage('invalid_page.learn_more', {
            a: (text: string) => (
              <LinkButton variant="text" color="primary" href={config.get('HOME_URL')} target="_blank" rel="noopener noreferrer">
                {text}
              </LinkButton>
            )
          })}
        </Typography>
      </Box>
    </InvalidPageContainer>
  )
})
