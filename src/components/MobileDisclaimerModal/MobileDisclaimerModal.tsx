import { type FC } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { ImageContainer, StyledTitle, StyledDescription } from 'decentraland-ui2/dist/components/Modal/DownloadModal/DownloadModal.styled'
import { ExplorerJumpIn } from 'decentraland-ui2/dist/components/Modal/DownloadModal/ExplorerJumpIn'
import { Modal as DCLModal } from 'decentraland-ui2/dist/components/Modal/Modal'
import { useFormatMessage } from '../../hooks/useFormatMessage'
import { MobileStoreBadges } from '../MobileStoreBadges/MobileStoreBadges'

const Modal = styled(DCLModal)({
  '.MuiPaper-root': {
    backgroundColor: '#ffffff',
    color: '#161518',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    '& .MuiIconButton-root': {
      color: '#a1a1a1'
    },
    '& > .MuiBox-root:last-child': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }
})

const CenteredContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: '0 24px 32px',
  textAlign: 'center'
})

export interface MobileDisclaimerModalProps {
  open: boolean
  onClose: () => void
}

export const MobileDisclaimerModal: FC<MobileDisclaimerModalProps> = ({ open, onClose }) => {
  const formatMessage = useFormatMessage()

  return (
    <Modal open={open} size="tiny" title=" " onClose={onClose}>
      <CenteredContent>
        <ImageContainer>
          <ExplorerJumpIn />
        </ImageContainer>
        <StyledTitle variant="h2">{formatMessage('mobile_store_badges.download_title')}</StyledTitle>
        <StyledDescription variant="body1">{formatMessage('mobile_store_badges.download_description')}</StyledDescription>
        <MobileStoreBadges size="large" />
      </CenteredContent>
    </Modal>
  )
}
