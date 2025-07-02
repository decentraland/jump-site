import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const DEFAULT_POSITION = '0,0'
export const DEFAULT_REALM = 'main'

export interface ParsedPosition {
  original: string
  coordinates: [number, number]
}

export interface QueryParams {
  position: ParsedPosition
  realm: string
  id?: string | null
}

/**
 * Parses a position string into coordinates
 * @param position Position string in format "x,y" or "x.y"
 * @returns Parsed coordinates with original string
 */
const parsePosition = (position: string): ParsedPosition => {
  const original = position
  // Replace dots with commas for consistency
  const normalizedPosition = position.replace('.', ',')
  // Split and convert to numbers, defaulting to 0 if invalid
  const [x, y] = normalizedPosition.split(',').map(coord => {
    const num = Number(coord)
    return isNaN(num) ? 0 : num
  })

  return {
    original,
    coordinates: [x, y]
  }
}

/**
 * Custom hook to handle common query parameters
 * @returns Processed query parameters
 */
export const useQueryParams = (): QueryParams => {
  const [searchParams] = useSearchParams()

  return useMemo(() => {
    const position = searchParams.get('position') ?? DEFAULT_POSITION
    const realm = searchParams.get('realm') ?? DEFAULT_REALM
    const id = searchParams.get('id')

    return {
      position: parsePosition(position),
      realm,
      id
    }
  }, [searchParams])
}
