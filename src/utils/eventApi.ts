import type { Event } from '../components/Pages/EventsPage/types'
import { config } from '../config'

export interface EventsApiResponse {
  ok: boolean
  data: Event[]
}

export interface EventAttendeeResponse {
  ok: boolean
  message?: string
}

type FetchFunction = (url: string, init?: RequestInit, additionalMetadata?: Record<string, unknown>) => Promise<Response>

/**
 * Events API client with support for both authenticated and non-authenticated operations
 */
export class EventsApi {
  private baseUrl: string
  private authenticatedFetch?: FetchFunction

  constructor(authenticatedFetch?: FetchFunction) {
    this.baseUrl = config.get('EVENTS_API_URL')
    this.authenticatedFetch = authenticatedFetch
  }

  /**
   * Fetches events from the Decentraland Events API
   * @param options Optional parameters to filter events
   * @param fetchFn Optional fetch function (defaults to global fetch)
   * @returns Promise with events data
   */
  async fetchEvents(options?: { position?: [number, number]; realm?: string }, fetchFn: FetchFunction = fetch): Promise<EventsApiResponse> {
    try {
      let url = `${this.baseUrl}/events`
      const params = new URLSearchParams()

      if (options?.position) {
        params.set('position', `${options.position[0]},${options.position[1]}`)
      }

      if (options?.realm) {
        params.set('world_names[]', options.realm)
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetchFn(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: EventsApiResponse = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  }

  /**
   * Fetches events by position (backward compatibility)
   * @param position Optional position coordinates to filter events [x, y]
   * @param fetchFn Optional fetch function (defaults to global fetch)
   * @returns Promise with events data
   */
  async fetchEventsByPosition(position?: [number, number], fetchFn: FetchFunction = fetch): Promise<EventsApiResponse> {
    return this.fetchEvents({ position }, fetchFn)
  }

  /**
   * Fetches events by realm
   * @param realm The realm name to filter events
   * @param fetchFn Optional fetch function (defaults to global fetch)
   * @returns Promise with events data
   */
  async fetchEventsByRealm(realm: string, fetchFn: FetchFunction = fetch): Promise<EventsApiResponse> {
    return this.fetchEvents({ realm }, fetchFn)
  }

  /**
   * Fetches a single event by ID
   * @param eventId The event ID to fetch
   * @param fetchFn Optional fetch function (defaults to global fetch)
   * @returns Promise with event data
   */
  async fetchEvent(eventId: string, fetchFn: FetchFunction = fetch): Promise<Event | null> {
    try {
      const response = await fetchFn(`${this.baseUrl}/events/${eventId}`)

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.ok ? data.data : null
    } catch (error) {
      console.error('Error fetching event:', error)
      throw error
    }
  }

  /**
   * Marks an event as interested (adds user as attendee)
   * Requires authentication - must use authenticated fetch
   * @param eventId The event ID to attend
   * @returns Promise with operation result
   */
  async attendee(eventId: string): Promise<EventAttendeeResponse> {
    if (!this.authenticatedFetch) {
      throw new Error('Authentication required: attendee operation requires authenticated fetch')
    }

    try {
      const response = await this.authenticatedFetch(`${this.baseUrl}/events/${eventId}/attendees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: EventAttendeeResponse = await response.json()
      return data
    } catch (error) {
      console.error('Error attending event:', error)
      throw error
    }
  }

  /**
   * Unmarks an event as interested (removes user as attendee)
   * Requires authentication - must use authenticated fetch
   * @param eventId The event ID to unattend
   * @returns Promise with operation result
   */
  async unattendee(eventId: string): Promise<EventAttendeeResponse> {
    if (!this.authenticatedFetch) {
      throw new Error('Authentication required: unattendee operation requires authenticated fetch')
    }

    try {
      const response = await this.authenticatedFetch(`${this.baseUrl}/events/${eventId}/attendees`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: EventAttendeeResponse = await response.json()
      return data
    } catch (error) {
      console.error('Error unattending event:', error)
      throw error
    }
  }
}
