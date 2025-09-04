import { memo, useEffect, useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryParams, DEFAULT_REALM } from '../../../hooks/useQueryParams'
import { useRealmValidation } from '../../../hooks/useRealmValidation'
import { fromPlace, type CardData } from '../../../utils/cardDataTransformers'
import { Creator, PeerApi } from '../../../utils/peerApi'
import { fetchPlaces } from '../../../utils/placesApi'
import { MainPageContainer } from '../../MainPageContainer/MainPage.styled'
import { ResponsiveCard } from '../../ResponsiveCard'

const peerApi = new PeerApi()

export const PlacesPage: FC = memo(() => {
  const navigate = useNavigate()
  const { position, realm } = useQueryParams()
  const { validateRealm } = useRealmValidation()
  const [places, setPlaces] = useState<CardData[]>([])
  const [creator, setCreator] = useState<Creator>({
    user_name: '',
    user: '',
    avatar: ''
  })
  const [isLoading, setIsLoading] = useState(true)

  const createGenericPlace = (coordinates: [number, number], realm?: string): CardData => ({
    id: 'generic-place',
    type: 'place',
    title: realm,
    user_name: 'Unknown',
    coordinates,
    image: undefined,
    description: `Welcome to ${realm}! Explore this virtual world and discover amazing places.`,
    user_count: 0,
    favorites: 0,
    scene_name: 'Decentraland',
    position: coordinates.join(','),
    realm
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        let validatedRealm: string | undefined

        // Validate realm if provided
        if (realm) {
          const validationResult = await validateRealm(realm, DEFAULT_REALM)
          if (!validationResult.isValid) {
            throw new Error(validationResult.error)
          }
          validatedRealm = validationResult.validatedRealm
        }

        // Fetch places data
        const response = await fetchPlaces({
          position: position.coordinates,
          realm: validatedRealm
        })

        if (response.ok && response.data.length > 0) {
          // Transform places data using the fromPlace utility
          const transformedPlaces = response.data.map(place => fromPlace(place, validatedRealm))
          setPlaces(transformedPlaces)

          // Fetch creator information
          const creatorResponse = await peerApi.fetchSceneDeployerInfo(transformedPlaces[0].coordinates.join(','))
          if (creatorResponse.ok && creatorResponse.data) {
            setCreator({
              user_name: creatorResponse.data.deployerName,
              user: creatorResponse.data.deployerAddress,
              avatar: creatorResponse.data.deployerAvatar
            })
          }
        } else {
          // Use generic place data when no places are found
          const genericPlace = createGenericPlace(position.coordinates, validatedRealm)
          setPlaces([genericPlace])
        }
      } catch (err) {
        navigate('/places/invalid')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [position.coordinates, realm, navigate, validateRealm])

  return (
    <MainPageContainer>
      <ResponsiveCard data={places[0]} creator={creator} isLoading={isLoading} />
    </MainPageContainer>
  )
})
