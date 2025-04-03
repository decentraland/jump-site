import { type FC } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import laptopImage from '../../assets/laptop.svg'
import { DownloadButton } from '../DownloadButton/DownloadButton'
import { Modal, ModalContainer, ModalTitle, ModalImage, ModalContent, ModalCloseButton } from './DownloadModal.styled'

export interface DownloadModalProps {
  open: boolean
  onClose: () => void
  osName?: string
  arch?: string
}

export const DownloadModal: FC<DownloadModalProps> = ({ open, onClose, osName, arch }) => {
  return (
    <Modal open={open} size="tiny">
      <ModalContainer>
        <ModalCloseButton onClick={onClose}>
          <CloseIcon />
        </ModalCloseButton>
        <ModalContent>
          <ModalImage src={laptopImage} alt="Download Decentraland" />
          <ModalTitle>Download Decentraland to Jump in.</ModalTitle>
          <ModalTitle as="h3" style={{ fontSize: '19px', fontWeight: 500 }}>
            Download the all-new Decentraland and come back to this page to jump straight into this place.
          </ModalTitle>
          <DownloadButton osName={osName} arch={arch} />
        </ModalContent>
      </ModalContainer>
    </Modal>
  )
}
