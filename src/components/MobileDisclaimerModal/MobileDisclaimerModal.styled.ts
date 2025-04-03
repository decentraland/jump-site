import styled from '@emotion/styled'
import { Modal as DCLModal } from 'decentraland-ui2/dist/components/Modal/Modal'
import { Box, IconButton } from 'decentraland-ui2'

export const Modal = styled(DCLModal)({
  ['.MuiPaper-root']: {
    background: 'linear-gradient(332deg, rgba(131, 14, 91, 0.95) 3%, rgba(46, 1, 62, 0.95) 35%)',
    position: 'relative',
    borderRadius: 16,
    maxWidth: '90%',
    margin: 16,
    minHeight: 'auto'
  }
})

export const ModalContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 24,
  padding: 32,
  textAlign: 'center'
})

export const ModalTitle = styled('h2')({
  fontSize: 24,
  fontWeight: 600,
  textAlign: 'center',
  margin: 0,
  lineHeight: 1.2,
  color: 'white'
})

export const ModalDescription = styled('p')({
  fontSize: 16,
  lineHeight: 1.5,
  textAlign: 'center',
  margin: 0,
  color: 'white',
  opacity: 0.8
})

export const ModalCloseButton = styled(IconButton)({
  position: 'absolute',
  top: 14,
  right: 14,
  ['&:hover']: {
    backgroundColor: '#31282814'
  },
  svg: {
    color: 'white'
  }
})
