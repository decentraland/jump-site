import { memo, useEffect, useMemo, useState, useCallback, type FC } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import CheckIcon from '@mui/icons-material/Check'
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded'
import ShareIcon from '@mui/icons-material/Share'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Box, Typography, Button, IconButton, CircularProgress, Snackbar, useMobileMediaQuery } from 'decentraland-ui2'
import { useAuthenticatedFetch } from '../../../hooks/useAuthenticatedFetch'
import { useFormatMessage } from '../../../hooks/useFormatMessage'
import { useRequireAuth } from '../../../hooks/useRequireAuth'
import { fromEvent, type CardData } from '../../../utils/cardDataTransformers'
import { EventsApi } from '../../../utils/eventApi'
import { Creator, PeerApi } from '../../../utils/peerApi'
import { fetchPlaces } from '../../../utils/placesApi'
import { MainPageContainer } from '../../MainPageContainer/MainPage.styled'
import { ResponsiveCard } from '../../ResponsiveCard'
import { EventCardActions, EventCardActionRow } from './EventCardActions.styled'
import type { Event } from './types'
import { getGoogleCalendar, getJumpInUrl } from './utils'

const DEFAULT_POSITION = '0,0'

export const EventsPage: FC = memo(() => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [events, setEvents] = useState<CardData[]>([])
  const [creator, setCreator] = useState<Creator>({
    user_name: '',
    user: '',
    avatar: ''
  })
  const [originalEvents, setOriginalEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [loadingActions, setLoadingActions] = useState({
    calendar: false,
    interested: false,
    share: false
  })
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    eventTitle: string
    action: 'added' | 'removed'
    autoHideDuration: number | null
  }>({
    open: false,
    eventTitle: '',
    action: 'added',
    autoHideDuration: null
  })

  const formatMessage = useFormatMessage()

  // Mobile detection
  const isMobile = useMobileMediaQuery()

  // Get authenticated fetch function
  const authenticatedFetch = useAuthenticatedFetch()
  const eventsApi = new EventsApi(authenticatedFetch)
  const peerApi = new PeerApi()

  const position = searchParams.get('position') ?? DEFAULT_POSITION

  // Convert position string to coordinates array
  const coordinates: [number, number] = useMemo(() => {
    const [x, y] = position.split(',').map(Number)
    return [x || 0, y || 0]
  }, [position])

  // Fetch events with retry logic
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Use authenticated fetch for both API calls
      const [eventsResponse, placesResponse] = await Promise.all([eventsApi.fetchEvents(coordinates), fetchPlaces(coordinates)])

      if (eventsResponse.ok && eventsResponse.data.length > 0) {
        // Store original events data
        setOriginalEvents(eventsResponse.data)

        const creatorResponse = await peerApi.fetchCreator(eventsResponse.data[0].user)
        if (creatorResponse.ok && creatorResponse.data) {
          setCreator(creatorResponse.data)
        }

        // Transform events data using the fromEvent utility
        const transformedEvents = eventsResponse.data.map(event => {
          const eventData = fromEvent(event)

          // If the event is live, try to get user_count from places data
          if (eventData.live && placesResponse.ok) {
            const matchingPlace = placesResponse.data.find(
              place => place.title === event.scene_name || place.base_position === event.coordinates.join(',')
            )

            if (matchingPlace) {
              eventData.user_count = matchingPlace.user_count || 0
            }
          }

          return eventData
        })

        setEvents(transformedEvents)
        setRetryCount(0) // Reset retry count on success
      } else {
        navigate('/events/invalid')
      }
    } catch (err) {
      navigate('/events/invalid')
    } finally {
      setIsLoading(false)
    }
  }, [coordinates, authenticatedFetch, navigate])

  // Retry function
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1)
    fetchData()
  }, [fetchData])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleInterested = useRequireAuth(
    useCallback(async () => {
      if (!events[0]?.id) return

      setLoadingActions(prev => ({ ...prev, interested: true }))

      try {
        if (!events[0].attending) {
          const response = await eventsApi.attendee(events[0].id)
          if (response.ok) {
            setEvents(prev => prev.map(event => (event.id === events[0].id ? { ...event, attending: true } : event)))
            setSnackbar({
              open: true,
              eventTitle: events[0].title,
              action: 'added',
              autoHideDuration: 4000
            })
          }
        } else {
          const response = await eventsApi.unattendee(events[0].id)
          if (response.ok) {
            setEvents(prev => prev.map(event => (event.id === events[0].id ? { ...event, attending: false } : event)))
            setSnackbar({
              open: true,
              eventTitle: events[0].title,
              action: 'removed',
              autoHideDuration: 4000
            })
          }
        }
      } catch (error) {
        console.error('Error updating attendance:', error)
      } finally {
        setLoadingActions(prev => ({ ...prev, interested: false }))
      }
    }, [events, eventsApi])
  )

  const handleAddToCalendar = useCallback(async () => {
    if (!events[0] || !originalEvents[0]) return

    setLoadingActions(prev => ({ ...prev, calendar: true }))

    try {
      const calendarUrl = getGoogleCalendar(originalEvents[0])

      if (calendarUrl) {
        window.open(calendarUrl, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      console.error('Error opening calendar:', error)
    } finally {
      setLoadingActions(prev => ({ ...prev, calendar: false }))
    }
  }, [events, originalEvents])

  const handleShare = useCallback(async () => {
    setLoadingActions(prev => ({ ...prev, share: true }))

    try {
      await navigator.share({
        title: originalEvents[0].name,
        text: originalEvents[0].description,
        url: getJumpInUrl(originalEvents[0])
      })
      console.log('share')
    } catch (error) {
      console.error('Error sharing:', error)
    } finally {
      setLoadingActions(prev => ({ ...prev, share: false }))
    }
  }, [])

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }, [])

  if (error) {
    return (
      <MainPageContainer>
        <Box mb={4}>
          <Typography variant="h3" align="center" color="error">
            Error Loading Events
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2, mb: 3 }}>
            {error}
          </Typography>
          <Box textAlign="center">
            <Button variant="contained" onClick={handleRetry} disabled={isLoading} sx={{ mr: 2 }}>
              {isLoading ? 'Retrying...' : 'Try Again'}
            </Button>
            <Typography variant="caption" color="textSecondary">
              {retryCount > 0 && `Attempt ${retryCount + 1}`}
            </Typography>
          </Box>
        </Box>
      </MainPageContainer>
    )
  }

  const currentEvent = events[0]
  const isEvent = currentEvent?.date && currentEvent?.total_attendees !== undefined
  const shouldShowActions = !isLoading && isEvent && !currentEvent?.live

  return (
    <MainPageContainer>
      <ResponsiveCard isLoading={isLoading} data={currentEvent} creator={creator}>
        {shouldShowActions && !isMobile ? (
          // Desktop: Use EventCardActions wrapper - single row
          <EventCardActions isMobile={false}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={
                loadingActions.calendar ? (
                  <CircularProgress size={16} sx={{ color: '#FCFCFC' }} />
                ) : (
                  <DateRangeRoundedIcon sx={{ fontSize: 16 }} />
                )
              }
              aria-label={formatMessage('card.accessibility.add_to_calendar_button')}
              disabled={loadingActions.calendar}
              onClick={handleAddToCalendar}
              sx={{
                color: '#FCFCFC',
                borderColor: '#FCFCFC',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 14,
                px: 3,
                py: 1,
                '&:hover': {
                  backgroundColor: '#4A0F5F',
                  borderColor: '#FCFCFC',
                  color: '#FCFCFC !important'
                },
                '&:disabled': {
                  color: '#FCFCFC',
                  borderColor: '#FCFCFC',
                  opacity: 0.7
                }
              }}
            >
              {formatMessage('card.event.add_to_calendar')}
            </Button>

            <Button
              variant="outlined"
              startIcon={
                loadingActions.interested ? (
                  <CircularProgress size={16} sx={{ color: currentEvent.attending ? '#FF2D55' : '#161518' }} />
                ) : currentEvent.attending ? (
                  <StarRoundedIcon sx={{ fontSize: 16 }} />
                ) : (
                  <StarBorderRoundedIcon sx={{ fontSize: 16 }} />
                )
              }
              aria-label={formatMessage('card.accessibility.interested_button')}
              disabled={loadingActions.interested}
              onClick={handleInterested}
              sx={{
                backgroundColor: '#FCFCFC',
                color: currentEvent.attending ? '#FF2D55' : '#161518',
                borderColor: currentEvent.attending ? '#FF2D55' : '#E0E0E0',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 14,
                px: 3,
                py: 1,
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                  borderColor: currentEvent.attending ? '#FF2D55' : '#CCCCCC',
                  color: currentEvent.attending ? '#FF2D55 !important' : '#161518 !important'
                },
                '&:disabled': {
                  backgroundColor: '#FCFCFC',
                  color: currentEvent.attending ? '#FF2D55' : '#161518',
                  borderColor: currentEvent.attending ? '#FF2D55' : '#E0E0E0',
                  opacity: 0.7
                }
              }}
            >
              {formatMessage('card.event.interested')}
            </Button>

            <Button
              variant="outlined"
              aria-label={formatMessage('card.accessibility.share_button')}
              disabled={loadingActions.share}
              onClick={handleShare}
              sx={{
                backgroundColor: '#FCFCFC',
                color: '#161518',
                borderColor: '#E0E0E0',
                borderRadius: 2,
                minWidth: 'auto',
                width: 48,
                height: 40,
                p: 0,
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                  borderColor: '#FF2D55'
                },
                '&:disabled': {
                  backgroundColor: '#FCFCFC',
                  color: '#161518',
                  borderColor: '#E0E0E0',
                  opacity: 0.7
                }
              }}
            >
              {loadingActions.share ? (
                <CircularProgress size={16} sx={{ color: '#FF2D55' }} />
              ) : (
                <ShareIcon sx={{ fontSize: 16, color: '#FF2D55' }} />
              )}
            </Button>
          </EventCardActions>
        ) : shouldShowActions && isMobile ? (
          <EventCardActions isMobile={true}>
            {/* First row: Add to Calendar (full width) */}
            <EventCardActionRow isMobile={true}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={
                  loadingActions.calendar ? (
                    <CircularProgress size={16} sx={{ color: '#FCFCFC' }} />
                  ) : (
                    <DateRangeRoundedIcon sx={{ fontSize: 16 }} />
                  )
                }
                aria-label={formatMessage('card.accessibility.add_to_calendar_button')}
                disabled={loadingActions.calendar}
                onClick={handleAddToCalendar}
                sx={{
                  color: '#FCFCFC',
                  borderColor: '#FCFCFC',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: 14,
                  px: 3,
                  py: 1,
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#4A0F5F',
                    borderColor: '#FCFCFC',
                    color: '#FCFCFC !important'
                  },
                  '&:disabled': {
                    color: '#FCFCFC',
                    borderColor: '#FCFCFC',
                    opacity: 0.7
                  }
                }}
              >
                {formatMessage('card.event.add_to_calendar')}
              </Button>
            </EventCardActionRow>

            {/* Second row: Interested and Share (side by side) */}
            <EventCardActionRow isMobile={true}>
              <Button
                variant="outlined"
                startIcon={
                  loadingActions.interested ? (
                    <CircularProgress size={16} sx={{ color: currentEvent.attending ? '#FF2D55' : '#161518' }} />
                  ) : currentEvent.attending ? (
                    <StarRoundedIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <StarBorderRoundedIcon sx={{ fontSize: 16 }} />
                  )
                }
                aria-label={formatMessage('card.accessibility.interested_button')}
                disabled={loadingActions.interested}
                onClick={handleInterested}
                sx={{
                  backgroundColor: '#FCFCFC',
                  color: currentEvent.attending ? '#FF2D55' : '#161518',
                  borderColor: currentEvent.attending ? '#FF2D55' : '#E0E0E0',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: 14,
                  px: 3,
                  py: 1,
                  flex: 1,
                  '&:hover': {
                    backgroundColor: '#F5F5F5',
                    borderColor: currentEvent.attending ? '#FF2D55' : '#CCCCCC',
                    color: currentEvent.attending ? '#FF2D55 !important' : '#161518 !important'
                  },
                  '&:disabled': {
                    backgroundColor: '#FCFCFC',
                    color: currentEvent.attending ? '#FF2D55' : '#161518',
                    borderColor: currentEvent.attending ? '#FF2D55' : '#E0E0E0',
                    opacity: 0.7
                  }
                }}
              >
                {formatMessage('card.event.interested')}
              </Button>

              <IconButton
                aria-label={formatMessage('card.accessibility.share_button')}
                disabled={loadingActions.share}
                onClick={handleShare}
                sx={{
                  backgroundColor: '#FCFCFC',
                  color: '#161518',
                  borderColor: '#E0E0E0',
                  borderRadius: 2,
                  minWidth: 'auto',
                  height: 40,
                  width: 40,
                  p: 0,
                  '&:hover': {
                    backgroundColor: '#F5F5F5',
                    borderColor: '#FF2D55'
                  },
                  '&:disabled': {
                    backgroundColor: '#FCFCFC',
                    color: '#161518',
                    borderColor: '#E0E0E0',
                    opacity: 0.7
                  }
                }}
              >
                {loadingActions.share ? (
                  <CircularProgress size={16} sx={{ color: '#FF2D55' }} />
                ) : (
                  <ShareIcon sx={{ fontSize: 16, color: '#FF2D55' }} />
                )}
              </IconButton>
            </EventCardActionRow>
          </EventCardActions>
        ) : null}
      </ResponsiveCard>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.autoHideDuration}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: isMobile ? '160px' : 0 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: '#000000',
            color: 'white',
            borderRadius: '12px',
            px: 2,
            py: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          <CheckIcon sx={{ fontSize: 20, color: 'white' }} />
          <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 600 }}>
            {formatMessage(snackbar.action === 'added' ? 'event.snackbar.added_to_my_events' : 'event.snackbar.removed_from_my_events', {
              eventTitle: snackbar.eventTitle
            })}{' '}
            <Typography
              component="a"
              href="https://decentraland.org/events/me/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#FF2D55',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {formatMessage('event.snackbar.my_events')}
            </Typography>
          </Typography>
        </Box>
      </Snackbar>
    </MainPageContainer>
  )
})
