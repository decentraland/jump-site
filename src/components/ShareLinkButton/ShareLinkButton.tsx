import { useCallback, type FC } from 'react'
import ShareIcon from '@mui/icons-material/Share'
import { Typography } from 'decentraland-ui2'
import { useFormatMessage } from '../../hooks/useFormatMessage'
import { ShareLinkContainer, ShareLinkButton as StyledShareLinkButton } from './ShareLinkButton.styled'

interface ShareLinkButtonProps {
  url?: string
  title?: string
}

export const ShareLinkButton: FC<ShareLinkButtonProps> = ({ url, title }) => {
  const formatMessage = useFormatMessage()

  const handleShare = useCallback(async () => {
    const shareUrl = url || window.location.href
    const shareTitle = title || document.title

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl
        })
      } catch (error) {
        // User cancelled or error occurred, fallback to clipboard
        await navigator.clipboard.writeText(shareUrl)
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl)
        // Could add a toast notification here
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
      }
    }
  }, [url, title])

  return (
    <ShareLinkContainer>
      <StyledShareLinkButton variant="contained" onClick={handleShare} startIcon={<ShareIcon />} fullWidth>
        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: 16 }}>
          {formatMessage('share.button.text')}
        </Typography>
      </StyledShareLinkButton>
    </ShareLinkContainer>
  )
}
