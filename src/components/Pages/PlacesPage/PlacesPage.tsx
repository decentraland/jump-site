import { memo, useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { fromPlace, type CardData } from '../../../utils/cardDataTransformers'
import { fetchPlaces } from '../../../utils/placesApi'
import { MainPageContainer } from '../../MainPageContainer/MainPage.styled'
import { ResponsiveCard } from '../../ResponsiveCard'

const DEFAULT_POSITION = '0,0'

export const PlacesPage: FC = memo(() => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [places, setPlaces] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const position = searchParams.get('position') ?? DEFAULT_POSITION

  // Convert position string to coordinates array
  const coordinates: [number, number] = useMemo(() => {
    const [x, y] = position.split(',').map(Number)
    return [x || 0, y || 0]
  }, [position])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetchPlaces(coordinates)
        if (response.ok && response.data.length > 0) {
          // Transform places data using the fromPlace utility
          const transformedPlaces = response.data.map(fromPlace)
          setPlaces(transformedPlaces)
        } else {
          navigate('/places/invalid')
        }
      } catch (err) {
        navigate('/places/invalid')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [coordinates, navigate])

  return (
    <MainPageContainer>
      <ResponsiveCard data={places[0]} isLoading={isLoading} />
    </MainPageContainer>
  )
})
