import { memo, type FC, type ReactNode } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import PersonIcon from '@mui/icons-material/Person'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Box, CircularProgress, Skeleton } from 'decentraland-ui2'
import cardCreatorPlaceholder from '../../assets/card-creator-placeholder.webp'
import { config } from '../../config'
import { useFormatMessage } from '../../hooks/useFormatMessage'
import { type CardData } from '../../utils/cardDataTransformers'
import { eventHasEnded, formatEventDate } from '../../utils/dateFormatter'
import { type Creator } from '../../utils/peerApi'
import { LiveEventIcon } from '../Icons/LiveEventIcon/LiveEventIcon'
import { ShareLinkButton } from '../ShareLinkButton'
import { TextWrapper } from '../TextWrapper/TextWrapper'
import {
  MobileCardContainer,
  MobileTopSection,
  MobileMiddleSection,
  MobileStickyBottomContainer,
  MobileCardImage,
  MobileAttendeesBadge,
  MobileCardContent,
  MobileCardTitle,
  MobileCardCreator,
  MobileCardDate,
  MobileCardLocation,
  MobileLoadingContainer,
  MobileCreatorLabel,
  MobileCreatorAvatar,
  MobileUserProfileLink
} from './MobileCard.styled'

export interface Place {
  id: string
  title: string
  image: string
  description: string
  positions: string[]
  base_position: string
  owner: string | null
  contact_name?: string
  favorites?: number
  likes?: number
  dislikes?: number
  categories?: string[]
  world?: boolean
  world_name?: string
  user_visits?: number
  user_count?: number
  // For compatibility with Card component
  name?: string
  coordinates?: [number, number]
  user_name?: string
  position: [number, number]
  url?: string
  realm?: string
}

type MobileCardProps = {
  data: CardData
  isLoading?: boolean
  children?: ReactNode
  creator?: Creator
  stickyContent?: ReactNode
}

const formatLocation = (coordinates: [number, number]): string => {
  return `${coordinates[0]}, ${coordinates[1]}`
}

export const MobileCard: FC<MobileCardProps> = memo(({ data, isLoading = false, children, creator, stickyContent }) => {
  const formatMessage = useFormatMessage()

  if (isLoading) {
    return (
      <MobileCardContainer>
        <MobileTopSection>
          <MobileLoadingContainer>
            <CircularProgress disableShrink />
          </MobileLoadingContainer>
        </MobileTopSection>
        <MobileMiddleSection style={{ paddingBottom: '175px' }}>
          <MobileCardContent>
            <Skeleton variant="text" animation="wave" sx={{ fontSize: 24, fontWeight: 700, marginBottom: '8px' }} />
            <Skeleton variant="text" animation="wave" sx={{ fontSize: 14, marginBottom: '6px' }} />
            <Skeleton variant="text" animation="wave" sx={{ fontSize: 14, marginBottom: '6px' }} />
            <Skeleton variant="text" animation="wave" sx={{ fontSize: 14, marginBottom: '12px' }} />
            <Skeleton variant="rectangular" animation="wave" sx={{ height: 60 }} />
          </MobileCardContent>
        </MobileMiddleSection>
        {/* Default sticky content when loading */}
        {stickyContent && <MobileStickyBottomContainer>{stickyContent}</MobileStickyBottomContainer>}
      </MobileCardContainer>
    )
  }

  // Determine if this is an event (has date and total_attendees)
  const isEvent = data.start_at && data.total_attendees !== undefined
  const isPlace = data.user_count !== undefined

  // Use creator data if provided, otherwise fall back to data properties
  const displayUserName = creator?.user_name || data.user_name
  const displayUser = creator?.user || data.user
  const displayAvatar = creator?.avatar || cardCreatorPlaceholder

  return (
    <MobileCardContainer>
      <MobileTopSection>
        <MobileCardImage
          src={data.image}
          alt={formatMessage(isEvent ? 'card.accessibility.event_image' : 'card.accessibility.place_image', { title: data.title })}
        />
        {isEvent && (
          <MobileAttendeesBadge backgroundColor={data.live ? '#FF2D55' : '#FCFCFC'} style={{ color: data.live ? 'white' : '#161518' }}>
            {data.live ? (
              <>
                <LiveEventIcon />
                {formatMessage('card.event.live')} +{data.user_count || 0}
              </>
            ) : (
              <>
                <StarRoundedIcon sx={{ fontSize: 14, color: '#FF2D55' }} />+{data.total_attendees}
              </>
            )}
          </MobileAttendeesBadge>
        )}
        {isPlace && data.user_count && data.user_count > 0 ? (
          <MobileAttendeesBadge backgroundColor="#FCFCFC">
            <CircleRoundedIcon sx={{ fontSize: 14 }} htmlColor="#00A146" />
            <PersonIcon sx={{ fontSize: 14 }} />
            {data.user_count}
          </MobileAttendeesBadge>
        ) : null}
      </MobileTopSection>

      <MobileMiddleSection>
        <MobileCardContent>
          <MobileCardTitle>{data.title}</MobileCardTitle>
          <MobileCardCreator>
            <MobileCreatorAvatar
              src={displayAvatar}
              alt={formatMessage('card.accessibility.creator_avatar', { userName: displayUserName })}
            />
            <MobileCreatorLabel>{formatMessage('card.creator.by')} </MobileCreatorLabel>
            {displayUser ? (
              <MobileUserProfileLink
                href={`${config.get('PROFILE_URL')}accounts/${displayUser}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={formatMessage('card.accessibility.user_profile_link', { userName: displayUserName })}
              >
                {displayUserName}
              </MobileUserProfileLink>
            ) : (
              <span style={{ color: '#FF2D55', fontSize: 16, fontWeight: 500 }}>{displayUserName}</span>
            )}
          </MobileCardCreator>
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {isEvent && data.start_at && (
              <MobileCardDate eventHasEnded={eventHasEnded(data)}>
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                {eventHasEnded(data) ? formatMessage('event.has_ended') : formatEventDate(data.start_at)}
              </MobileCardDate>
            )}
            <MobileCardLocation>
              <PlaceOutlinedIcon sx={{ fontSize: 16 }} />
              {data?.realm ?? formatLocation(data.coordinates)}
            </MobileCardLocation>
          </Box>
          <TextWrapper maxHeight={250} gradientColor="#2E013E">
            {data.description}
          </TextWrapper>
        </MobileCardContent>
      </MobileMiddleSection>

      <MobileStickyBottomContainer>
        {children ? children : <ShareLinkButton url={data?.url} title={data?.title} />}
      </MobileStickyBottomContainer>
    </MobileCardContainer>
  )
})
