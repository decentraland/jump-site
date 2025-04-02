import styled from '@emotion/styled'
import { Modal as DCLModal } from 'decentraland-ui2/dist/components/Modal/Modal'
import { Box, IconButton } from 'decentraland-ui2'

export const Modal = styled(DCLModal)({
  ['.MuiPaper-root']: {
    backgroundColor: 'white',
    position: 'relative'
  }
})

export const ModalContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 32,
  padding: 32,
  textAlign: 'center'
})

export const ModalTitle = styled('h2')({
  fontSize: 21,
  fontWeight: 600,
  textAlign: 'center',
  margin: 0,
  lineHeight: 1.2,
  color: 'black'
})

export const ModalImage = styled('img')({
  width: 200,
  height: 200
})

export const ModalContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 24,
  width: '100%'
})

export const ModalCloseButton = styled(IconButton)({
  position: 'absolute',
  top: 14,
  right: 14,
  ['&:hover']: {
    backgroundColor: '#31282814'
  },
  svg: {
    color: 'black'
  }
})
