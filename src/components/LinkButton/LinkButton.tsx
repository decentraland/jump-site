import { type FC } from 'react'
import { type ButtonProps } from 'decentraland-ui2'
import { StyledLinkButton } from './LinkButton.styled'

export interface LinkButtonProps extends ButtonProps {
  href: string
  target?: string
  rel?: string
}

export const LinkButton: FC<LinkButtonProps> = ({ children, ...props }) => {
  return (
    <StyledLinkButton variant="text" color="primary" {...props}>
      {children}
    </StyledLinkButton>
  )
}
