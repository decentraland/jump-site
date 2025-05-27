import type { ChainId } from '@dcl/schemas/dist/dapps/chain-id'

// TODO: Move to @dcl/schemas
export interface Event {
  id: string
  name: string
  image: string
  description: string
  start_at: string
  finish_at: string
  coordinates: [number, number]
  user: string
  user_name: string
  total_attendees: number
  attending: boolean
  scene_name?: string
  position: [number, number]
  url?: string
  x: number
  y: number
  world?: boolean
  server?: string
  live?: boolean
}

// TODO: Move to @dcl/schemas
export type CatalystAbout = {
  healthy: boolean
  content: {
    healthy: boolean
    version: string
    commitHash: string
    publicUrl: string
  }
  lambdas: {
    healthy: boolean
    version: string
    commitHash: string
    publicUrl: string
  }
  configurations: {
    networkId: ChainId
    globalScenesUrn: string[]
    scenesUrn: string[]
    realmName: string
  }
  comms: {
    healthy: boolean
    protocol: string
    commitHash: string
  }
  bff: {
    healthy: boolean
    commitHash: string
    userCount: number
    protocolVersion: string
    publicUrl: string
  }
  acceptingUsers: boolean
}
