import { memo, useEffect, useMemo, useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { useRealmValidation } from '../../../hooks/useRealmValidation'
import { fromPlace, type CardData } from '../../../utils/cardDataTransformers'
import { Creator, PeerApi } from '../../../utils/peerApi'
import { fetchPlaces } from '../../../utils/placesApi'
import { MainPageContainer } from '../../MainPageContainer/MainPage.styled'
import { ResponsiveCard } from '../../ResponsiveCard'

const peerApi = new PeerApi()

export const PlacesPage: FC = memo(() => {
  const navigate = useNavigate()
  const { position, realm: realmOrWorld } = useQueryParams()
  const { validateRealmOrWorld } = useRealmValidation()
  const [places, setPlaces] = useState<CardData[]>([])
  const [creator, setCreator] = useState<Creator>({
    user_name: '',
    user: '',
    avatar: ''
  })
  const [isLoading, setIsLoading] = useState(true)

  const createGenericPlace = useMemo(
    () =>
      (coordinates: [number, number], realm?: string): CardData => ({
        id: 'generic-place',
        type: 'place',
        title: realm || '',
        user_name: 'Unknown',
        coordinates,
        image: undefined,
        description: `Welcome to ${realm}! Explore this virtual world and discover amazing places.`,
        user_count: 0,
        favorites: 0,
        scene_name: 'Decentraland',
        position: coordinates.join(','),
        realm
      }),
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        let validatedRealmOrWorld: string | undefined

        // Validate realm if provided
        if (realmOrWorld) {
          const validationResult = await validateRealmOrWorld(realmOrWorld)
          if (!validationResult.isValid) {
            throw new Error(validationResult.error)
          }
          validatedRealmOrWorld = validationResult.validatedRealmOrWorld
        }

        // Fetch places data
        const response = await fetchPlaces({
          position: position.coordinates,
          realm: validatedRealmOrWorld
        })

        if (response.ok && response.data.length > 0) {
          // Transform places data using the fromPlace utility
          const transformedPlaces = response.data.map(fromPlace)
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
          // If no profile information can be retrieved from the scene deployer, try to fetch it from the place user name (if available)
          else if (transformedPlaces[0].user_name) {
            const userProfileFromPlace = await peerApi.fetchUserProfile(transformedPlaces[0].user_name)
            if (userProfileFromPlace.ok && userProfileFromPlace.data) {
              setCreator({
                user_name: userProfileFromPlace.data.avatars[0].name,
                user: userProfileFromPlace.data.avatars[0].userId,
                avatar: userProfileFromPlace.data.avatars[0].avatar?.snapshots?.face256
              })
            }
          }
        } else {
          // Use generic place data when no places are found
          const genericPlace = createGenericPlace(position.coordinates, validatedRealmOrWorld)
          setPlaces([genericPlace])
        }
      } catch (err) {
        navigate('/places/invalid')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [position.coordinates, realmOrWorld, navigate, validateRealmOrWorld])

  return (
    <MainPageContainer>
      <ResponsiveCard data={places[0]} creator={creator} isLoading={isLoading} />
    </MainPageContainer>
  )
})
