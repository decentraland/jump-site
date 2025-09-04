import { config } from '../config'
import { AboutResponse, isEns } from '../utils'

type FetchFunction = (url: string, init?: RequestInit, additionalMetadata?: Record<string, unknown>) => Promise<Response>

export interface WorldContentApiResponse {
  ok: boolean
  data?: AboutResponse
  error?: string
}

export class WorldContentApi {
  private baseUrl: string
  private authenticatedFetch?: FetchFunction

  constructor(authenticatedFetch?: FetchFunction) {
    this.baseUrl = config.get('WORLD_CONTENT_API_URL')
    this.authenticatedFetch = authenticatedFetch
  }

  /**
   * Fetches world content about information from the Decentraland World Content API
   * @param options Optional parameters to filter world content
   * @param fetchFn Optional fetch function (defaults to class fetch or global fetch)
   * @returns Promise with world content about data
   */
  async fetchWorldContentAbout(options?: { realm?: string }, fetchFn?: FetchFunction): Promise<WorldContentApiResponse> {
    const useFetch = fetchFn || this.authenticatedFetch || fetch

    try {
      if (!options?.realm) {
        return { ok: false, error: 'Realm parameter is required' }
      }

      if (!isEns(options.realm)) {
        return { ok: false, error: 'Invalid realm name. Must be an ENS name (ending with .eth)' }
      }

      const url = `${this.baseUrl}/${options.realm.toLowerCase()}/about`
      const response = await useFetch(url)

      if (!response.ok) {
        return {
          ok: false,
          error: `HTTP error! status: ${response.status}`
        }
      }

      const data: AboutResponse = await response.json()
      return { ok: true, data }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      console.error('Error fetching world content about:', errorMessage)
      return { ok: false, error: errorMessage }
    }
  }
}

// Backward compatibility functions
export const fetchWorldContentAbout = async (options?: { realm?: string }, fetchFn: FetchFunction = fetch): Promise<AboutResponse> => {
  const worldContentApi = new WorldContentApi()
  const result = await worldContentApi.fetchWorldContentAbout(options, fetchFn)

  if (!result.ok) {
    throw new Error(result.error || 'Failed to fetch world content about')
  }

  return result.data!
}
