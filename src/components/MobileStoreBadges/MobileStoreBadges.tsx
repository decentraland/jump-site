import { memo, type FC } from 'react'
import googlePlayBadge from '../../assets/google-play-badge.svg'
import { Container, BadgeLink } from './MobileStoreBadges.styled'
import type { MobileStoreBadgesProps } from './MobileStoreBadges.types'

const MOBILE_APP = {
  ANDROID_STORE_URL: 'https://play.google.com/store/apps/details?id=org.decentraland.godotexplorer'
}

export const MobileStoreBadges: FC<MobileStoreBadgesProps> = memo(({ size = 'small' }) => {
  return (
    <Container size={size}>
      <BadgeLink href={MOBILE_APP.ANDROID_STORE_URL} target="_blank" rel="noopener noreferrer" size={size}>
        <img src={googlePlayBadge} />
      </BadgeLink>
    </Container>
  )
})
