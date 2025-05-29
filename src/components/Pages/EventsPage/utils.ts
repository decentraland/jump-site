import { config } from '../../../config'
import { formatMessage } from '../../../contexts/locale/utils'
import type { Event } from './types'

export function getJumpInUrl(event: Pick<Event, 'x' | 'y' | 'server' | 'world'>): string {
  const url = new URL(`${config.get('JUMP_IN_URL')}/events/`)

  const position = [event.x || 0, event.y || 0].join(',')
  url.searchParams.set('position', position)

  return url.toString()
}

/**
 * Formats a date for Google Calendar using native Intl.DateTimeFormat
 * Google Calendar expects format: YYYYMMDDTHHMMSSZ
 */
function formatDateForGoogleCalendar(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

export function getGoogleCalendar(event?: Event) {
  if (!event) {
    return null
  }

  const url = getJumpInUrl(event)
  const params = new URLSearchParams()
  params.set('text', event.name)

  const jumpInLabel = formatMessage('components.button.get_google_calendar.jump_in')

  if (event.description && url) {
    params.set('details', `${event.description}\n\n${jumpInLabel}: ${url}`)
  } else if (event.description) {
    params.set('details', event.description)
  } else if (url) {
    params.set('details', `${jumpInLabel}: ${url}`)
  }

  const start_at = new Date(event.start_at)
  const endDate = new Date(event.finish_at)

  const dates = [formatDateForGoogleCalendar(start_at), formatDateForGoogleCalendar(endDate)]
  params.set('dates', dates.join('/'))

  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`
}
