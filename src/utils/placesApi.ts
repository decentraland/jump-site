import { type Place } from '../components/Pages/PlacesPage/types'
import { config } from '../config'
import { isEns } from '../utils'

export interface PlacesApiResponse {
  ok: boolean
  data: Place[]
}

type FetchFunction = (url: string, init?: RequestInit, additionalMetadata?: Record<string, unknown>) => Promise<Response>

/**
 * Checks if a string is a valid domain or domain with path
 * @param str String to check
 * @returns True if the string is a valid domain (with optional path)
 */
export function isValidDomainOrUrl(str: string | undefined): boolean {
  if (!str) return false
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

export class PlacesApi {
  private baseUrl: string
  private authenticatedFetch?: FetchFunction

  constructor(authenticatedFetch?: FetchFunction) {
    this.baseUrl = config.get('PLACES_API_URL')
    this.authenticatedFetch = authenticatedFetch
  }

  /**
   * Fetches places from the Decentraland Places API
   * @param options Optional parameters to filter places
   * @param fetchFn Optional fetch function (defaults to class fetch or global fetch)
   * @returns Promise with places data
   */
  async fetchPlaces(options?: { position?: [number, number]; realm?: string }, fetchFn?: FetchFunction): Promise<PlacesApiResponse> {
    const useFetch = fetchFn || this.authenticatedFetch || fetch

    try {
      let url = this.baseUrl

      if (options?.realm && isEns(options.realm)) {
        url = `${this.baseUrl}/worlds?names=${options.realm.toLowerCase()}`
      } else if (options?.position || (options?.realm && isValidDomainOrUrl(options.realm))) {
        url = `${this.baseUrl}/places/?positions=${options.position?.[0]},${options.position?.[1]}`
      } else {
        url = `${this.baseUrl}/places`
      }

      const response = await useFetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: PlacesApiResponse = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching places:', error)
      throw error
    }
  }

  /**
   * Fetches places by realm name (ENS)
   * @param realm The realm name (must be an ENS name)
   * @param fetchFn Optional fetch function (defaults to class fetch or global fetch)
   * @returns Promise with places data
   */
  async fetchPlacesByRealm(realm: string, fetchFn?: FetchFunction): Promise<PlacesApiResponse> {
    if (!isEns(realm)) {
      throw new Error('Invalid realm name. Must be an ENS name (ending with .eth)')
    }
    return this.fetchPlaces({ realm }, fetchFn)
  }

  /**
   * Fetches a single place by ID
   * @param placeId The place ID to fetch
   * @param fetchFn Optional fetch function (defaults to class fetch or global fetch)
   * @returns Promise with place data
   */
  async fetchPlace(placeId: string, fetchFn?: FetchFunction): Promise<Place | null> {
    const useFetch = fetchFn || this.authenticatedFetch || fetch

    try {
      const response = await useFetch(`${this.baseUrl}/places/${placeId}`)

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.ok ? data.data : null
    } catch (error) {
      console.error('Error fetching place:', error)
      throw error
    }
  }
}

// Backward compatibility functions
export const fetchPlaces = async (
  options?: { position?: [number, number]; realm?: string },
  fetchFn: FetchFunction = fetch
): Promise<PlacesApiResponse> => {
  const placesApi = new PlacesApi()

  return placesApi.fetchPlaces(options, fetchFn)
}
