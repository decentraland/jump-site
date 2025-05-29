import { FC } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-ui2'
import { useAuth } from '../../contexts/auth'
import { NavbarProps } from './types'

const CDN_RELEASES = {
  Windows: { amd64: 'https://explorer-artifacts.decentraland.org/launcher-rust/Decentraland_x64-setup.exe' },
  macOS: {
    amd64: 'https://explorer-artifacts.decentraland.org/launcher-rust/Decentraland_aarch64.dmg',
    arm64: 'https://explorer-artifacts.decentraland.org/launcher-rust/Decentraland_aarch64.dmg'
  }
}

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
      cdnLinks={CDN_RELEASES}
    />
  )
}
