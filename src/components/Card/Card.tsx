import { memo, type FC, type ReactNode } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import PersonIcon from '@mui/icons-material/Person'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Box, CircularProgress, Skeleton } from 'decentraland-ui2'
import cardCreatorPlaceholder from '../../assets/card-creator-placeholder.webp'
import cardImageEventsPlaceholder from '../../assets/card-events-placeholder.webp'
import cardImagePlacesPlaceholder from '../../assets/card-places-placeholder.webp'
import { config } from '../../config'
import { useFormatMessage } from '../../hooks/useFormatMessage'
import { type CardData } from '../../utils/cardDataTransformers'
import { eventHasEnded, formatEventDate } from '../../utils/dateFormatter'
import { type Creator } from '../../utils/peerApi'
import { LiveEventIcon } from '../Icons/LiveEventIcon/LiveEventIcon'
import { JumpInButton } from '../JumpInButton'
import { TextWrapper } from '../TextWrapper/TextWrapper'
import {
  CardContainer,
  LeftSection,
  RightSection,
  CardImage,
  AttendeesBadge,
  CardContent,
  CardTitle,
  CardCreator,
  CardDate,
  CardLocation,
  LoadingContainer,
  CreatorLabel,
  CreatorAvatar,
  UserProfileLink
} from './Card.styled'

type CardProps = {
  data: CardData
  isLoading?: boolean
  children?: ReactNode
  creator?: Creator
}

const formatLocation = (coordinates: [number, number]): string => {
  return `${coordinates[0]}, ${coordinates[1]}`
}

export const Card: FC<CardProps> = memo(({ data, isLoading = false, children, creator }) => {
  const formatMessage = useFormatMessage()

  if (isLoading) {
    return (
      <CardContainer>
        <LeftSection>
          <LoadingContainer>
            <CircularProgress disableShrink />
          </LoadingContainer>
        </LeftSection>
        <RightSection>
          <CardContent>
            <Skeleton variant="text" animation="wave" sx={{ fontSize: 28, fontWeight: 700, marginBottom: '12px' }} />
            <Skeleton variant="text" animation="wave" sx={{ fontSize: 16, marginBottom: '8px' }} />
            <Skeleton variant="text" animation="wave" sx={{ fontSize: 16, marginBottom: '8px' }} />
            <Skeleton variant="text" animation="wave" sx={{ fontSize: 16, marginBottom: '16px' }} />
            <Skeleton variant="rectangular" animation="wave" sx={{ height: 80 }} />
          </CardContent>
        </RightSection>
      </CardContainer>
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
    <CardContainer>
      <LeftSection>
        <CardImage
          src={data.image || (isPlace ? cardImagePlacesPlaceholder : cardImageEventsPlaceholder)}
          alt={formatMessage(isEvent ? 'card.accessibility.event_image' : 'card.accessibility.place_image', { title: data.title })}
        />
        {isEvent && (
          <AttendeesBadge backgroundColor={data.live ? '#FF2D55' : '#FCFCFC'} style={{ color: data.live ? 'white' : '#161518' }}>
            {data.live ? (
              <>
                <LiveEventIcon />
                {formatMessage('card.event.live')} +{data.user_count || 0}
              </>
            ) : (
              <>
                <StarRoundedIcon sx={{ fontSize: 16, color: '#FF2D55' }} />+{data.total_attendees}
              </>
            )}
          </AttendeesBadge>
        )}
        {isPlace && data.user_count && data.user_count > 0 ? (
          <AttendeesBadge backgroundColor="#FCFCFC">
            <CircleRoundedIcon sx={{ fontSize: 16, color: '#00A146' }} />
            <PersonIcon sx={{ fontSize: 16, color: '#161518' }} />
            {data.user_count}
          </AttendeesBadge>
        ) : null}
      </LeftSection>
      <RightSection>
        <CardContent>
          <CardTitle style={{ marginBottom: '16px' }}>{data.title}</CardTitle>
          <CardCreator>
            <CreatorAvatar src={displayAvatar} alt={formatMessage('card.accessibility.creator_avatar', { userName: displayUserName })} />
            <CreatorLabel>{formatMessage('card.creator.by')} </CreatorLabel>
            {displayUser ? (
              <UserProfileLink
                href={`${config.get('PROFILE_URL')}accounts/${displayUser}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={formatMessage('card.accessibility.user_profile_link', { userName: displayUserName })}
              >
                {displayUserName}
              </UserProfileLink>
            ) : (
              displayUserName
            )}
          </CardCreator>
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {isEvent && data.start_at && (
              <CardDate eventHasEnded={eventHasEnded(data)}>
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                {eventHasEnded(data) ? formatMessage('event.has_ended') : formatEventDate(data.start_at)}
              </CardDate>
            )}
            <CardLocation>
              <PlaceOutlinedIcon sx={{ fontSize: 16 }} />
              {data?.realm ?? formatLocation(data.coordinates)}
            </CardLocation>
          </Box>
          <TextWrapper maxHeight={128} gradientColor="#380A4D">
            {data.description || formatMessage('card.place.default_description')}
          </TextWrapper>
        </CardContent>

        {/* Actions Outlet - Children are rendered here */}
        {children}

        {/* Default JumpIn button for places or live events */}
        {!children && (isPlace || (isEvent && data.live)) && (
          <JumpInButton realm={data.realm} position={data.position} sx={{ width: '300px' }} />
        )}
      </RightSection>
    </CardContainer>
  )
})
