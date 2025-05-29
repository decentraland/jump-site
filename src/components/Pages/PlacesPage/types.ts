export interface Place {
  id: string
  title: string
  image: string
  description: string
  positions: string[]
  base_position: string
  owner: string | null
  contact_name?: string
  favorites?: number
  likes?: number
  dislikes?: number
  categories?: string[]
  world?: boolean
  world_name?: string
  user_visits?: number
  user_count?: number
  // For compatibility with Card component
  name?: string
  coordinates?: [number, number]
  user_name?: string
  position: [number, number]
  url?: string
  realm?: string
}
