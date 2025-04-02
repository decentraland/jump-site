import { type FC } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import dclLogo from '../../assets/decentraland-logo.svg'
import { Modal, ModalContainer, ModalTitle, ModalDescription, ModalCloseButton } from './MobileDisclaimerModal.styled'

export interface MobileDisclaimerModalProps {
  open: boolean
  onClose: () => void
}

export const MobileDisclaimerModal: FC<MobileDisclaimerModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} size="tiny">
      <ModalContainer>
        <ModalCloseButton onClick={onClose}>
          <CloseIcon />
        </ModalCloseButton>
        <img src={dclLogo} alt="Decentraland Logo" width="64" height="64" />
        <ModalTitle>Switch to a Computer to Use Decentraland</ModalTitle>
        <ModalDescription>
          Enter your email to get a download reminder message for when you're back at your computer. This also signs you up for
          Decentraland's newsletter for the latest news and events
        </ModalDescription>
        <iframe
          src="https://embeds.beehiiv.com/d7d652da-adc8-422f-9176-4b653a244020?slim=true"
          data-test-id="beehiiv-embed"
          height="52"
          frameBorder="0"
          scrolling="no"
          width="100%"
          style={{
            margin: 0,
            borderRadius: '0px !important',
            backgroundColor: 'transparent'
          }}
        />
      </ModalContainer>
    </Modal>
  )
}
