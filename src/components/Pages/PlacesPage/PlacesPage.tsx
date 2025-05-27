import { memo, useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Typography } from 'decentraland-ui2'
import { fromPlace, type CardData } from '../../../utils/cardDataTransformers'
import { fetchPlaces } from '../../../utils/placesApi'
import { MainPageContainer } from '../../MainPageContainer/MainPage.styled'
import { ResponsiveCard } from '../../ResponsiveCard'

const DEFAULT_POSITION = '0,0'

export const PlacesPage: FC = memo(() => {
  const [searchParams] = useSearchParams()
  const [places, setPlaces] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const position = searchParams.get('position') ?? DEFAULT_POSITION

  // Convert position string to coordinates array
  const coordinates: [number, number] = useMemo(() => {
    const [x, y] = position.split(',').map(Number)
    return [x || 0, y || 0]
  }, [position])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetchPlaces(coordinates)
        if (response.ok) {
          // Transform places data using the fromPlace utility
          const transformedPlaces = response.data.map(fromPlace)
          setPlaces(transformedPlaces)
        } else {
          setError('Failed to fetch places')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [coordinates])

  if (error) {
    return (
      <MainPageContainer>
        <Box mb={4}>
          <Typography variant="h3" align="center" color="error">
            Error Loading Places
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </MainPageContainer>
    )
  }

  return (
    <MainPageContainer>
      <ResponsiveCard data={places[0]} isLoading={isLoading} />
    </MainPageContainer>
  )
})
