import { FC } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-ui2'
import { useAuth } from '../../contexts/auth'
import { NavbarProps } from './types'

export const Navbar: FC<NavbarProps> = props => {
  const { avatar, wallet, isSignedIn, signIn, signOut } = useAuth()

  return (
    <BaseNavbar
      {...props}
      activePage=""
      address={wallet}
      avatar={avatar}
      isSignedIn={isSignedIn}
      onClickSignIn={signIn}
      onClickSignOut={signOut}
    />
  )
}
