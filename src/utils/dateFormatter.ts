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

const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = day * 365

  if (diffInSeconds < minute) {
    return 'just now'
  } else if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < week) {
    const days = Math.floor(diffInSeconds / day)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < month) {
    const weeks = Math.floor(diffInSeconds / week)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month)
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else {
    const years = Math.floor(diffInSeconds / year)
    return `${years} year${years > 1 ? 's' : ''} ago`
  }
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()

  // If the date is in the future, use detailed format
  if (date > now) {
    return formatDetailedDate(date)
  }

  // If the date is in the past, use relative format
  return formatRelativeTime(date)
}
