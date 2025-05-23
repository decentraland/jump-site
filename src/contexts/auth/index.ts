import { AuthProvider, useAuth } from './AuthProvider'

export { AuthProvider, useAuth }

// Re-export types for library consumers
export type {
  AuthContextValue,
  AuthConfig,
  AuthProviderProps,
  UseAuthOptions,
  AddEthereumChainParameters,
  ProviderSwitchError
} from './types'

// Re-export utilities for advanced usage
export {
  createAuthConfig,
  defaultShouldUseBasePath,
  defaultFetchAvatar,
  getChainName,
  getChainConfiguration,
  getAddEthereumChainParameters,
  getProviderChainId,
  debugLog,
  buildRedirectUrl
} from './utils'

// Re-export error class
export { AuthError } from './types'
