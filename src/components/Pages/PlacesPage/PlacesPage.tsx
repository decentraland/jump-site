import { memo, useEffect, useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { fromPlace, type CardData } from '../../../utils/cardDataTransformers'
import { Creator, PeerApi } from '../../../utils/peerApi'
import { fetchPlaces, isValidDomainOrUrl } from '../../../utils/placesApi'
import { MainPageContainer } from '../../MainPageContainer/MainPage.styled'
import { ResponsiveCard } from '../../ResponsiveCard'

const peerApi = new PeerApi()

export const PlacesPage: FC = memo(() => {
  const navigate = useNavigate()
  const { position, realm } = useQueryParams()
  const [places, setPlaces] = useState<CardData[]>([])
  const [creator, setCreator] = useState<Creator>({
    user_name: '',
    user: '',
    avatar: ''
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetchPlaces({ position: position.coordinates, realm })
        if (response.ok && response.data.length > 0) {
          // Transform places data using the fromPlace utility
          const transformedPlaces = response.data.map(place => fromPlace(place, isValidDomainOrUrl(realm) ? realm : undefined))
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
  }, [position.coordinates, realm, navigate])

  return (
    <MainPageContainer>
      <ResponsiveCard data={places[0]} creator={creator} isLoading={isLoading} />
    </MainPageContainer>
  )
})
