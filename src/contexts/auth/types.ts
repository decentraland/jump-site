import type { ChainId, Avatar } from '@dcl/schemas'

// Core auth types
export interface AuthContextValue {
  wallet: string | undefined
  chainId: ChainId | undefined
  avatar: Avatar | undefined
  isSignedIn: boolean
  isConnecting: boolean
  signIn: () => void
  signOut: () => void
  changeNetwork: (chainId: ChainId) => Promise<void>
}

// Configuration types
export interface AuthConfig {
  /** Default chain ID to start with */
  defaultChainId: ChainId
  /** Auth service URL for redirecting to login */
  authUrl: string
  /** Base path for current application */
  basePath: string
  /** Function to determine if current host requires basePath */
  shouldUseBasePath?: (host: string) => boolean
  /** Custom function to fetch user avatar */
  fetchAvatar?: (address: string) => Promise<Avatar | undefined>
  /** Debug mode for development */
  debug?: boolean
}

// Provider props interface
export interface AuthProviderProps {
  children: React.ReactNode
  config: AuthConfig
}

// Hook options interface
export interface UseAuthOptions {
  /** Custom configuration overrides */
  config?: Partial<AuthConfig>
}

// Ethereum chain parameters for wallet operations
export interface AddEthereumChainParameters {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

// Provider error interface
export interface ProviderSwitchError {
  code?: number
  message?: string
}

// Custom error class for auth operations
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message)
    this.name = 'AuthError'
  }
}
