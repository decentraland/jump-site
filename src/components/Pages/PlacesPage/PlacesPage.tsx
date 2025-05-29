import { memo, useEffect, useMemo, useState, type FC } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { fromPlace, type CardData } from '../../../utils/cardDataTransformers'
import { Creator, PeerApi } from '../../../utils/peerApi'
import { fetchPlaces } from '../../../utils/placesApi'
import { MainPageContainer } from '../../MainPageContainer/MainPage.styled'
import { ResponsiveCard } from '../../ResponsiveCard'

const DEFAULT_POSITION = '0,0'
const DEFAULT_REALM = 'main'

const peerApi = new PeerApi()

export const PlacesPage: FC = memo(() => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [places, setPlaces] = useState<CardData[]>([])
  const [creator, setCreator] = useState<Creator>({
    user_name: '',
    user: '',
    avatar: ''
  })
  const [isLoading, setIsLoading] = useState(true)

  const position = searchParams.get('position') ?? DEFAULT_POSITION
  const realm = searchParams.get('realm') ?? DEFAULT_REALM

  // Convert position string to coordinates array
  const coordinates: [number, number] = useMemo(() => {
    const [x, y] = position.split(',').map(Number)
    return [x || 0, y || 0]
  }, [position])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetchPlaces({ position: coordinates, realm })
        if (response.ok && response.data.length > 0) {
          // Transform places data using the fromPlace utility
          const transformedPlaces = response.data.map(fromPlace)
          setPlaces(transformedPlaces)
          const creatorResponse = await peerApi.fetchSceneDeployerInfo(transformedPlaces[0].coordinates.join(','))
          if (creatorResponse.ok && creatorResponse.data) {
            setCreator({
              user_name: creatorResponse.data.deployerName,
              user: creatorResponse.data.deployerAddress,
              avatar: creatorResponse.data.deployerAvatar
            })
          }
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
      <ResponsiveCard data={places[0]} creator={creator} isLoading={isLoading} />
    </MainPageContainer>
  )
})
