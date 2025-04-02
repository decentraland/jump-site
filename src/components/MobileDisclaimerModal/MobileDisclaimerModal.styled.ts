import styled from '@emotion/styled'
import { Modal as DCLModal } from 'decentraland-ui2/dist/components/Modal/Modal'
import { Box, IconButton } from 'decentraland-ui2'

export const Modal = styled(DCLModal)({
  ['.MuiPaper-root']: {
    background: 'linear-gradient(332deg, rgba(131, 14, 91, 0.95) 3%, rgba(46, 1, 62, 0.95) 35%)',
    position: 'relative',
    borderRadius: '16px',
    maxWidth: '90%',
    margin: '16px',
    minHeight: 'auto'
  }
})

export const ModalContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '24px',
  padding: '32px',
  textAlign: 'center'
})

export const ModalTitle = styled.h2({
  fontSize: '24px',
  fontWeight: '600',
  textAlign: 'center',
  margin: '0',
  lineHeight: '1.2',
  color: 'white'
})

export const ModalDescription = styled.p({
  fontSize: '16px',
  lineHeight: '1.5',
  textAlign: 'center',
  margin: '0',
  color: 'white',
  opacity: 0.8
})

export const ModalCloseButton = styled(IconButton)({
  position: 'absolute',
  top: '14px',
  right: '14px',
  ['&:hover']: {
    backgroundColor: '#31282814'
  },
  svg: {
    color: 'white'
  }
})
