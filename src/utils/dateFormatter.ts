import { formatMessage } from '../contexts/locale/utils'
import type { CardData } from './cardDataTransformers'

const formatDetailedDate = (date: Date): string => {
  // Get local timezone offset in minutes and convert to hours
  const offsetInHours = -new Date().getTimezoneOffset() / 60
  const offsetSign = offsetInHours >= 0 ? '+' : ''
  const timezoneString = `UTC${offsetSign}${offsetInHours}`

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  const formatted = date.toLocaleDateString('en-US', options)
  const [datePart, timePart] = formatted.split(', ')
  return `${datePart} - ${timePart} (${timezoneString})`
}

const formatRelativeTime = (date: Date): { key: string; value: number } => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = day * 365

  if (diffInSeconds < minute) {
    return { key: 'event.time_ago.just_now', value: 0 }
  } else if (diffInSeconds < hour) {
    const value = Math.floor(diffInSeconds / minute)
    return { key: 'event.time_ago.minutes_ago', value }
  } else if (diffInSeconds < day) {
    const value = Math.floor(diffInSeconds / hour)
    return { key: 'event.time_ago.hours_ago', value }
  } else if (diffInSeconds < week) {
    const value = Math.floor(diffInSeconds / day)
    return { key: 'event.time_ago.days_ago', value }
  } else if (diffInSeconds < month) {
    const value = Math.floor(diffInSeconds / week)
    return { key: 'event.time_ago.weeks_ago', value }
  } else if (diffInSeconds < year) {
    const value = Math.floor(diffInSeconds / month)
    return { key: 'event.time_ago.months_ago', value }
  } else {
    const value = Math.floor(diffInSeconds / year)
    return { key: 'event.time_ago.years_ago', value }
  }
}

export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()

  // If the date is in the future, use detailed format
  if (date > now) {
    return formatDetailedDate(date)
  }

  // If the date is in the past, use relative format
  const { key, value } = formatRelativeTime(date)
  return `${formatMessage('event.time_ago.started')} ${formatMessage(key, { value })}`
}

export const eventHasEnded = (event?: CardData): boolean => {
  if (!event?.start_at || !event?.finish_at) {
    return false
  }

  const startAtDate = new Date(event.start_at)
  const finishAtDate = new Date(event.finish_at)
  const now = new Date()

  return now > finishAtDate && finishAtDate > startAtDate
}
