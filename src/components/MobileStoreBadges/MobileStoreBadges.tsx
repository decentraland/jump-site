import { memo, type FC } from 'react'
import styled from '@emotion/styled'
import googlePlayBadge from '../../assets/google-play-badge.svg'

const MOBILE_APP = {
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
  maxWidth: size === 'small' ? 160 : 200,
  '& img': {
    width: '100%',
    height: 'auto'
  },
  '&:hover': {
    opacity: 0.85
  }
}))

export const MobileStoreBadges: FC<MobileStoreBadgesProps> = memo(({ size = 'small', className }) => {
  return (
    <Container size={size} className={className}>
      <BadgeLink href={MOBILE_APP.ANDROID_STORE_URL} target="_blank" rel="noopener noreferrer" size={size}>
        <img src={googlePlayBadge} />
      </BadgeLink>
    </Container>
  )
})
