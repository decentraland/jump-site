import { memo, useCallback } from 'react'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import HardwareRoundedIcon from '@mui/icons-material/HardwareRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import SupportRoundedIcon from '@mui/icons-material/SupportRounded'
import XIcon from '@mui/icons-material/X'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { useMobileMediaQuery } from 'decentraland-ui2/dist/components/Media'
import { config } from '../../config'
import { Events, useAnalytics } from '../../hooks/useAnalytics'
import { useFormatMessage } from '../../hooks/useFormatMessage'
import { DiscordIcon } from '../Icons/DiscordIcon/DiscordIcon'
import { TiktokIcon } from '../Icons/TiktokIcon/TiktokIcon'
import {
  FooterContainer,
  IconButton,
  LinksContainer,
  LinksTitle,
  LinksWrapper,
  SocialContainer,
  SocialIconBox,
  SocialIconWrapper,
  SubscribeContainer,
  SubscribeSubtitle,
  SubscribeTitle,
  SubscriptionBeehiiv
} from './Footer.styled'

export enum SectionViewedTrack {
  CREATORS_CONNECT = 'Creators Connect',
  CREATORS_CREATE = 'Creators Create',
  CREATORS_EARN = 'Creators Earn',
  CREATORS_HERO = 'Creators Hero',
  CREATORS_JUMP_IN = 'Creators Jump In',
  CREATORS_LEARN = 'Creators Learn',
  CREATORS_WHY = 'Creators Why',
  CREATORS_FAQS = 'Creators Faqs',
  LANDING_HERO = 'Landing Hero',
  LANDING_EVENTS_PLACES_FEED = 'Landing Events Places Feed',
  LANDING_BLOG_FEED = 'Landing Blog Feed',
  LANDING_ABOUT = 'Landing About',
  LANDING_MISSIONS = 'Landing Missions',
  LANDING_MARKETPLACE = 'Landing Marketplace',
  LANDING_TRENDING = 'Landing Trending',
  LANDING_WORLDS = 'Landing Worlds',
  LANDING_FAQS = 'Landing Faqs',
  LANDING_FOOTER = 'Landing Footer',
  DOWNLOAD = 'Download'
}

export const Footer = memo(() => {
  const l = useFormatMessage()
  const analytics = useAnalytics()

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const href = (event.currentTarget as unknown as HTMLAnchorElement).href
      analytics.track(Events.CLICK_FOOTER_SOCIAL, {
        href
      })
      setTimeout(() => {
        window.location.href = href
      }, 500)
    },
    [analytics]
  )

  const handleSocialClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      const href = event.currentTarget.href
      analytics.track(Events.CLICK_FOOTER_SOCIAL, {
        href
      })
    },
    [analytics]
  )

  const isMobile = useMobileMediaQuery()

  return (
    <FooterContainer>
      <SubscribeContainer>
        <SubscribeSubtitle variant={isMobile ? 'h3' : 'h4'}>{l('footer.subscribe.stay_updated_with')}</SubscribeSubtitle>
        <SubscribeTitle variant={isMobile ? 'h1' : 'h2'}>{l('footer.subscribe.decentraland')}</SubscribeTitle>
        <SubscriptionBeehiiv src={config.get('BEEHIIV_SUBSCRIBE_URL')} data-test-id="beehiiv-embed"></SubscriptionBeehiiv>
        <SocialContainer>
          <SocialIconWrapper>
            <SocialIconBox
              href={config.get('DISCORD_URL')}
              onClick={handleSocialClick}
              target="_blank"
              rel="noopener noreferrer"
              data-place={SectionViewedTrack.LANDING_FOOTER}
            >
              <DiscordIcon fontSize="inherit" />
            </SocialIconBox>
            <SocialIconBox
              href={config.get('GITHUB_URL')}
              onClick={handleSocialClick}
              target="_blank"
              rel="noopener noreferrer"
              data-place={SectionViewedTrack.LANDING_FOOTER}
            >
              <GitHubIcon fontSize="inherit" />
            </SocialIconBox>
            <SocialIconBox
              href={config.get('X_URL')}
              onClick={handleSocialClick}
              target="_blank"
              rel="noopener noreferrer"
              data-place={SectionViewedTrack.LANDING_FOOTER}
            >
              <XIcon fontSize="inherit" />
            </SocialIconBox>
            <SocialIconBox
              href={config.get('INSTAGRAM_URL')}
              onClick={handleSocialClick}
              target="_blank"
              rel="noopener noreferrer"
              data-place={SectionViewedTrack.LANDING_FOOTER}
            >
              <InstagramIcon fontSize="inherit" />
            </SocialIconBox>
            <SocialIconBox
              href={config.get('YOUTUBE_URL')}
              onClick={handleSocialClick}
              target="_blank"
              rel="noopener noreferrer"
              data-place={SectionViewedTrack.LANDING_FOOTER}
            >
              <YouTubeIcon fontSize="inherit" />
            </SocialIconBox>
            <SocialIconBox
              href={config.get('TIKTOK_URL')}
              onClick={handleSocialClick}
              target="_blank"
              rel="noopener noreferrer"
              data-place={SectionViewedTrack.LANDING_FOOTER}
            >
              <TiktokIcon fontSize="inherit" />
            </SocialIconBox>
            <SocialIconBox
              href={config.get('LINKEDIN_URL')}
              onClick={handleSocialClick}
              target="_blank"
              rel="noopener noreferrer"
              data-place={SectionViewedTrack.LANDING_FOOTER}
            >
              <LinkedInIcon fontSize="inherit" />
            </SocialIconBox>
          </SocialIconWrapper>
        </SocialContainer>
      </SubscribeContainer>
      <LinksContainer>
        <LinksWrapper>
          <LinksTitle variant="body1">{l('footer.social.resources')}</LinksTitle>
          <IconButton
            variant="text"
            color="secondary"
            startIcon={<LocalOfferRoundedIcon sx={{ transform: 'scaleX(-1)' }} />}
            href={config.get('MARKETPLACE_URL')}
            onClick={handleClick}
            data-place={SectionViewedTrack.LANDING_FOOTER}
          >
            {l('footer.social.marketplace')}
          </IconButton>
          <IconButton
            variant="text"
            color="secondary"
            startIcon={<HardwareRoundedIcon />}
            href={config.get('CREATE_URL')}
            onClick={handleClick}
            data-place={SectionViewedTrack.LANDING_FOOTER}
          >
            {l('footer.social.creator_hub')}
          </IconButton>
          <IconButton
            variant="text"
            color="secondary"
            startIcon={<InsertDriveFileRoundedIcon />}
            href={config.get('DOCS_URL')}
            onClick={handleClick}
            data-place={SectionViewedTrack.LANDING_FOOTER}
          >
            {l('footer.social.docs')}
          </IconButton>
          <IconButton
            variant="text"
            color="secondary"
            startIcon={<CalendarMonthRoundedIcon />}
            href={config.get('EVENTS_URL')}
            onClick={handleClick}
            data-place={SectionViewedTrack.LANDING_FOOTER}
          >
            {l('footer.social.events')}
          </IconButton>
          <IconButton
            variant="text"
            color="secondary"
            startIcon={<ArticleRoundedIcon />}
            href={config.get('BLOG_URL')}
            onClick={handleClick}
            data-place={SectionViewedTrack.LANDING_FOOTER}
          >
            {l('footer.social.blog')}
          </IconButton>
        </LinksWrapper>
        <LinksWrapper>
          <LinksTitle variant="body1">{l('footer.social.connect')}</LinksTitle>
          <IconButton
            variant="text"
            color="secondary"
            startIcon={<SupportRoundedIcon />}
            href={config.get('SUPPORT_URL')}
            onClick={handleClick}
            data-place={SectionViewedTrack.LANDING_FOOTER}
          >
            {l('footer.social.support')}
          </IconButton>
          <IconButton
            variant="text"
            color="secondary"
            startIcon={<MailRoundedIcon />}
            href={config.get('EMAIL_HELLO_URL')}
            onClick={handleClick}
            data-place={SectionViewedTrack.LANDING_FOOTER}
          >
            {l('footer.social.email')}
          </IconButton>
          <IconButton
            variant="text"
            color="secondary"
            startIcon={<PeopleAltRoundedIcon />}
            href={config.get('DAO_URL')}
            onClick={handleClick}
            data-place={SectionViewedTrack.LANDING_FOOTER}
          >
            {l('footer.social.dao')}
          </IconButton>
          <IconButton
            variant="text"
            color="secondary"
            startIcon={<HelpRoundedIcon />}
            href={config.get('FAQ_URL')}
            onClick={handleClick}
            data-place={SectionViewedTrack.LANDING_FOOTER}
          >
            {l('footer.social.faq')}
          </IconButton>
        </LinksWrapper>
      </LinksContainer>
    </FooterContainer>
  )
})
