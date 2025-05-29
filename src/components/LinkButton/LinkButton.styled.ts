import styled from '@emotion/styled'
import { Button } from 'decentraland-ui2'

export const StyledLinkButton = styled(Button)({
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'none'
  },
  '&:focus': {
    backgroundColor: 'transparent',
    textDecoration: 'none'
  },
  padding: 0,
  minWidth: 'auto'
})
