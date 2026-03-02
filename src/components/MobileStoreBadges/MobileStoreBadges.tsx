import { memo, type FC } from 'react'
import styled from '@emotion/styled'
import appStoreBadge from '../../assets/app-store-badge.svg'
import googlePlayBadge from '../../assets/google-play-badge.svg'
import { useFormatMessage } from '../../hooks/useFormatMessage'

const MOBILE_APP = {
  IOS_STORE_URL: 'https://testflight.apple.com/join/KF4r3jlU',
  ANDROID_STORE_URL: 'https://play.google.com/store/apps/details?id=org.decentraland.godotexplorer'
}

interface MobileStoreBadgesProps {
  size?: 'small' | 'large'
  className?: string
}

const Container = styled('div')<{ size: 'small' | 'large' }>(({ size }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: size === 'small' ? 12 : 16,
  width: '100%'
}))

const BadgeLink = styled('a')<{ size: 'small' | 'large' }>(({ size }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease',
  flex: 1,
  maxWidth: size === 'small' ? 280 : 320,
  '& img': {
    width: '100%',
    height: 'auto'
  },
  '&:hover': {
    opacity: 0.85
  }
}))

export const MobileStoreBadges: FC<MobileStoreBadgesProps> = memo(({ size = 'small', className }) => {
  const formatMessage = useFormatMessage()

  return (
    <Container size={size} className={className}>
      <BadgeLink
        href={MOBILE_APP.IOS_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={formatMessage('mobile_store_badges.download_ios')}
        size={size}
      >
        <img src={appStoreBadge} alt={formatMessage('mobile_store_badges.download_ios')} />
      </BadgeLink>
      <BadgeLink
        href={MOBILE_APP.ANDROID_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={formatMessage('mobile_store_badges.download_android')}
        size={size}
      >
        <img src={googlePlayBadge} alt={formatMessage('mobile_store_badges.download_android')} />
      </BadgeLink>
    </Container>
  )
})
