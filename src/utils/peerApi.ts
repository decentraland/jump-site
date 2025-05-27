import { config } from '../config'

// Types for peer API responses
export interface SceneEntity {
  id: string
  type: string
  pointers: string[]
  content: Array<{
    file: string
    hash: string
  }>
  version: string
  timestamp: number
  metadata: {
    display?: {
      title?: string
      description?: string
    }
    contact?: {
      name?: string
      email?: string
    }
    owner?: string
    scene?: {
      base: string
      parcels: string[]
    }
  }
}

export interface SceneDeployment {
  entityVersion: string
  entityType: string
  entityId: string
  entityTimestamp: number
  deployedBy: string
  pointers: string[]
  content: Array<{
    key: string
    hash: string
  }>
  metadata: {
    display?: {
      title?: string
      description?: string
    }
    contact?: {
      name?: string
      email?: string
    }
    owner?: string
  }
  localTimestamp: number
}

export interface ProfileData {
  timestamp: number
  avatars: Array<{
    hasClaimedName: boolean
    description: string
    name: string
    userId: string
    ethAddress: string
    version: number
    avatar: {
      snapshots: {
        face256: string
        body: string
      }
    }
    realName?: string
    links?: Array<{
      title: string
      url: string
    }>
  }>
}

export interface SceneDeployerInfo {
  deployerAddress: string
  deployerName: string
  deployerAvatar?: string
  sceneTitle?: string
  sceneDescription?: string
  contactName?: string
}

export interface Creator {
  user_name: string
  user: string
  avatar?: string
}

export class PeerApi {
  private peerUrl: string

  constructor() {
    this.peerUrl = config.get('PEER_URL')
  }

  /**
   * Step 1: Fetch entity data from scene position
   */
  async fetchSceneEntity(position: string): Promise<{ ok: boolean; data?: SceneEntity; error?: string }> {
    try {
      const response = await fetch(`${this.peerUrl}/content/entities/active`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pointers: [position]
        })
      })

      if (!response.ok) {
        return { ok: false, error: `HTTP ${response.status}: ${response.statusText}` }
      }

      const entities: SceneEntity[] = await response.json()

      if (!entities || entities.length === 0) {
        return { ok: false, error: 'No scene found at this position' }
      }

      return { ok: true, data: entities[0] }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  /**
   * Step 2: Fetch deployment data using entity ID
   */
  async fetchSceneDeployment(entityId: string): Promise<{ ok: boolean; data?: SceneDeployment; error?: string }> {
    try {
      const response = await fetch(`${this.peerUrl}/content/deployments/?entityId=${entityId}`, {
        method: 'GET',
        headers: {
          Accept: '*/*'
        }
      })

      if (!response.ok) {
        return { ok: false, error: `HTTP ${response.status}: ${response.statusText}` }
      }

      const deploymentData = await response.json()

      if (!deploymentData.deployments || deploymentData.deployments.length === 0) {
        return { ok: false, error: 'No deployment found for this entity' }
      }

      return { ok: true, data: deploymentData.deployments[0] }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  /**
   * Step 3: Fetch profile data using deployer address
   */
  async fetchUserProfile(userAddress: string): Promise<{ ok: boolean; data?: ProfileData; error?: string }> {
    try {
      const response = await fetch(`${this.peerUrl}/lambdas/profiles`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ids: [userAddress]
        })
      })

      if (!response.ok) {
        return { ok: false, error: `HTTP ${response.status}: ${response.statusText}` }
      }

      const profiles: ProfileData[] = await response.json()

      if (!profiles || profiles.length === 0) {
        return { ok: false, error: 'No profile found for this address' }
      }

      return { ok: true, data: profiles[0] }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  /**
   * Complete flow: Get scene deployer information from position
   */
  async fetchSceneDeployerInfo(position: string): Promise<{ ok: boolean; data?: SceneDeployerInfo; error?: string }> {
    try {
      // Step 1: Get entity data
      const entityResult = await this.fetchSceneEntity(position)
      if (!entityResult.ok || !entityResult.data) {
        return { ok: false, error: entityResult.error || 'Failed to fetch entity' }
      }

      // Step 2: Get deployment data
      const deploymentResult = await this.fetchSceneDeployment(entityResult.data.id)
      if (!deploymentResult.ok || !deploymentResult.data) {
        return { ok: false, error: deploymentResult.error || 'Failed to fetch deployment' }
      }

      // Step 3: Get profile data
      const profileResult = await this.fetchUserProfile(deploymentResult.data.deployedBy)
      if (!profileResult.ok || !profileResult.data) {
        return { ok: false, error: profileResult.error || 'Failed to fetch profile' }
      }

      // Extract relevant information
      const avatar = profileResult.data.avatars[0]
      const deployment = deploymentResult.data
      const entity = entityResult.data

      const deployerInfo: SceneDeployerInfo = {
        deployerAddress: deployment.deployedBy,
        deployerName: avatar?.name || avatar?.realName || 'Unknown',
        deployerAvatar: avatar?.avatar?.snapshots?.face256,
        sceneTitle: entity.metadata?.display?.title || deployment.metadata?.display?.title,
        sceneDescription: entity.metadata?.display?.description || deployment.metadata?.display?.description,
        contactName: entity.metadata?.contact?.name || deployment.metadata?.contact?.name
      }

      return { ok: true, data: deployerInfo }
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  /**
   * Get creator information from deployer address
   */
  async fetchCreator(deployerAddress: string): Promise<{ ok: boolean; data?: Creator; error?: string }> {
    const profileResult = await this.fetchUserProfile(deployerAddress)

    if (!profileResult.ok || !profileResult.data) {
      return { ok: false, error: profileResult.error || 'Failed to fetch profile' }
    }

    const avatar = profileResult.data.avatars[0]

    const creator: Creator = {
      user_name: avatar?.name || avatar?.realName || 'Unknown',
      user: deployerAddress,
      avatar: avatar?.avatar?.snapshots?.face256
    }

    return { ok: true, data: creator }
  }
}
