import { type Place } from '../components/Pages/PlacesPage/types'

export interface PlacesApiResponse {
  ok: boolean
  data: Place[]
}

type FetchFunction = (url: string, init?: RequestInit, additionalMetadata?: Record<string, unknown>) => Promise<Response>

export class PlacesApi {
  private baseUrl: string
  private authenticatedFetch?: FetchFunction

  constructor(baseUrl: string, authenticatedFetch?: FetchFunction) {
    this.baseUrl = baseUrl
    this.authenticatedFetch = authenticatedFetch
  }

  /**
   * Fetches places from the Decentraland Places API
   * @param position Optional position coordinates to filter places [x, y]
   * @param fetchFn Optional fetch function (defaults to class fetch or global fetch)
   * @returns Promise with places data
   */
  async fetchPlaces(position?: [number, number], fetchFn?: FetchFunction): Promise<PlacesApiResponse> {
    const useFetch = fetchFn || this.authenticatedFetch || fetch

    try {
      const url = position ? `${this.baseUrl}?positions=${position[0]},${position[1]}` : this.baseUrl
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
   * Fetches a single place by ID
   * @param placeId The place ID to fetch
   * @param fetchFn Optional fetch function (defaults to class fetch or global fetch)
   * @returns Promise with place data
   */
  async fetchPlace(placeId: string, fetchFn?: FetchFunction): Promise<Place | null> {
    const useFetch = fetchFn || this.authenticatedFetch || fetch

    try {
      const response = await useFetch(`${this.baseUrl}/${placeId}`)

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
export const fetchPlaces = async (position?: [number, number], fetchFn: FetchFunction = fetch): Promise<PlacesApiResponse> => {
  const placesApi = new PlacesApi('https://places.decentraland.org/api/places')
  return placesApi.fetchPlaces(position, fetchFn)
}
