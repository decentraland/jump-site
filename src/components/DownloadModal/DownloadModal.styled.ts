import styled from '@emotion/styled'
import { Modal as DCLModal } from 'decentraland-ui2/dist/components/Modal/Modal'
import { Box, IconButton } from 'decentraland-ui2'

export const Modal = styled(DCLModal)`
  .MuiPaper-root {
    background-color: white;
    position: relative;
  }
`

export const ModalContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 32px;
  text-align: center;
`

export const ModalTitle = styled.h2`
  font-size: 21px;
  font-weight: 600;
  text-align: center;
  margin: 0;
  line-height: 1.2;
  color: black;
`

export const ModalImage = styled.img`
  width: 200px;
  height: 200px;
`

export const ModalContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
`

export const ModalCloseButton = styled(IconButton)`
  position: absolute;
  top: 14px;
  right: 14px;

  &:hover {
    background-color: #31282814;
  }

  svg {
    color: black;
  }
`
