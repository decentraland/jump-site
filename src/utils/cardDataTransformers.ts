import type { Event } from '../components/Pages/EventsPage/types'
import type { Place } from '../components/Pages/PlacesPage/types'

// Unified CardData interface for the Card component
export interface CardData {
  id: string
  type: 'event' | 'place'
  title: string
  user_name: string
  user?: string // User ID for profile links (events) or deployer address (places)
  coordinates: [number, number]
  image: string
  description?: string
  // Event-specific fields
  start_at?: string
  finish_at?: string
  recurrent?: boolean
  total_attendees?: number
  attending?: boolean
  live?: boolean
  // Place-specific fields
  user_count?: number
  favorites?: number
  // Common optional fields
  url?: string
  scene_name?: string
  position: string
  realm?: string
}

/**
 * Transform place API data to unified CardData structure
 */
export const fromPlace = (data: Place): CardData => {
  const coordinates = data.base_position.split(',').map(Number) as [number, number]

  return {
    id: data.id,
    type: 'place',
    title: data.title,
    user_name: data.owner || data.contact_name || 'Unknown',
    coordinates,
    image: data.image,
    description: data.description,
    user_count: data.user_count || 0,
    favorites: data.favorites,
    scene_name: data.title,
    url: data.url,
    position: coordinates.join(','),
    realm: data.world ? data.world_name : undefined
  }
}

/**
 * Transform event API data to unified CardData structure
 */
export const fromEvent = (data: Event): CardData => {
  // Format the date from start_at
  const startDate = new Date(data.next_start_at)
  const formattedDate = startDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  const nextFinishAt = new Date(data.next_finish_at)
  const formattedNextFinishAt = nextFinishAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  return {
    id: data.id,
    type: 'event',
    title: data.name,
    user_name: data.user_name,
    user: data.user,
    coordinates: data.coordinates,
    image: data.image,
    description: data.description,
    start_at: formattedDate,
    finish_at: formattedNextFinishAt,
    recurrent: data.recurrent,
    total_attendees: data.total_attendees,
    attending: data.attending,
    live: data.live,
    scene_name: data.scene_name,
    url: data.url,
    position: data.coordinates.join(','),
    realm: data.world && data.server ? data.server : undefined
  }
}
