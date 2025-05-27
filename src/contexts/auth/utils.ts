import { ChainId } from '@dcl/schemas'
import type { Avatar } from '@dcl/schemas'
import type { Provider } from 'decentraland-connect'
import { AuthConfig, AddEthereumChainParameters } from './types'

/**
 * Default Decentraland host check function
 */
export const defaultShouldUseBasePath = (host: string): boolean => {
  return /^decentraland.(zone|org|today)$/.test(host)
}

/**
 * Default avatar fetcher for Decentraland
 */
export const defaultFetchAvatar = async (address: string, peerUrl = 'https://peer.decentraland.org'): Promise<Avatar | undefined> => {
  try {
    const response = await fetch(`${peerUrl}/lambdas/profiles`, {
      method: 'POST',
      body: JSON.stringify({ ids: [address] })
    })

    const data = await response.json()

    if (data.length > 0 && data[0]?.avatars?.length > 0) {
      return data[0].avatars[0]
    }

    return undefined
  } catch (error) {
    console.error('Error fetching avatar:', error)
    return undefined
  }
}

/**
 * Create auth configuration with all required values
 */
export const createAuthConfig = (config: AuthConfig): AuthConfig => {
  return {
    shouldUseBasePath: defaultShouldUseBasePath,
    fetchAvatar: (address: string) => defaultFetchAvatar(address),
    ...config,
    // Only set debug default if not provided
    debug: config.debug ?? process.env.NODE_ENV === 'development'
  }
}

/**
 * Chain name mapping
 */
export const getChainName = (chainId: ChainId): string => {
  const names: Record<number, string> = {
    [ChainId.ETHEREUM_MAINNET]: 'Ethereum Mainnet',
    [ChainId.ETHEREUM_ROPSTEN]: 'Ethereum Ropsten',
    [ChainId.ETHEREUM_RINKEBY]: 'Ethereum Rinkeby',
    [ChainId.ETHEREUM_KOVAN]: 'Ethereum Kovan',
    [ChainId.ETHEREUM_GOERLI]: 'Ethereum Goerli',
    [ChainId.ETHEREUM_SEPOLIA]: 'Ethereum Sepolia',
    [ChainId.MATIC_MAINNET]: 'Polygon Mainnet',
    [ChainId.MATIC_MUMBAI]: 'Polygon Mumbai',
    [ChainId.MATIC_AMOY]: 'Polygon Amoy',
    [ChainId.BSC_MAINNET]: 'BSC Mainnet',
    [ChainId.OPTIMISM_MAINNET]: 'Optimism Mainnet',
    [ChainId.ARBITRUM_MAINNET]: 'Arbitrum Mainnet',
    [ChainId.FANTOM_MAINNET]: 'Fantom Mainnet',
    [ChainId.AVALANCHE_MAINNET]: 'Avalanche Mainnet'
  }
  return names[chainId] || `Chain ID ${chainId}`
}

/**
 * Chain configuration mapping
 */
export const getChainConfiguration = (chainId: ChainId): { rpcURL: string } => {
  const configs: Record<number, { rpcURL: string }> = {
    [ChainId.ETHEREUM_MAINNET]: { rpcURL: 'https://mainnet.infura.io/v3/' },
    [ChainId.ETHEREUM_ROPSTEN]: { rpcURL: 'https://ropsten.infura.io/v3/' },
    [ChainId.ETHEREUM_RINKEBY]: { rpcURL: 'https://rinkeby.infura.io/v3/' },
    [ChainId.ETHEREUM_KOVAN]: { rpcURL: 'https://kovan.infura.io/v3/' },
    [ChainId.ETHEREUM_GOERLI]: { rpcURL: 'https://goerli.infura.io/v3/' },
    [ChainId.ETHEREUM_SEPOLIA]: { rpcURL: 'https://sepolia.infura.io/v3/' }
  }
  return configs[chainId] || { rpcURL: 'https://mainnet.infura.io/v3/' }
}

/**
 * Get Ethereum chain parameters for wallet operations
 */
export const getAddEthereumChainParameters = (chainId: ChainId): AddEthereumChainParameters => {
  const hexChainId = '0x' + chainId.toString(16)
  const chainName = getChainName(chainId)
  const chainConfig = getChainConfiguration(chainId)

  switch (chainId) {
    case ChainId.MATIC_MAINNET:
      return {
        chainId: hexChainId,
        chainName,
        nativeCurrency: {
          name: 'POL',
          symbol: 'POL',
          decimals: 18
        },
        rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
      }
    case ChainId.MATIC_MUMBAI:
      return {
        chainId: hexChainId,
        chainName,
        nativeCurrency: {
          name: 'POL',
          symbol: 'POL',
          decimals: 18
        },
        rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/']
      }
    case ChainId.MATIC_AMOY:
      return {
        chainId: hexChainId,
        chainName,
        nativeCurrency: {
          name: 'POL',
          symbol: 'POL',
          decimals: 18
        },
        rpcUrls: ['https://rpc-amoy.polygon.technology/'],
        blockExplorerUrls: ['https://www.oklink.com/amoy']
      }
    case ChainId.BSC_MAINNET:
      return {
        chainId: hexChainId,
        chainName,
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com/']
      }
    case ChainId.OPTIMISM_MAINNET:
      return {
        chainId: hexChainId,
        chainName,
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: ['https://mainnet.optimism.io/'],
        blockExplorerUrls: ['https://optimistic.etherscan.io/']
      }
    case ChainId.ARBITRUM_MAINNET:
      return {
        chainId: hexChainId,
        chainName,
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        blockExplorerUrls: ['https://arbiscan.io/']
      }
    case ChainId.FANTOM_MAINNET:
      return {
        chainId: hexChainId,
        chainName,
        nativeCurrency: {
          name: 'Fantom',
          symbol: 'FTM',
          decimals: 18
        },
        rpcUrls: ['https://rpcapi.fantom.network'],
        blockExplorerUrls: ['https://ftmscan.com/']
      }
    case ChainId.AVALANCHE_MAINNET:
      return {
        chainId: hexChainId,
        chainName,
        nativeCurrency: {
          name: 'AVAX',
          symbol: 'AVAX',
          decimals: 18
        },
        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://snowtrace.io']
      }
    case ChainId.ETHEREUM_MAINNET:
    case ChainId.ETHEREUM_ROPSTEN:
    case ChainId.ETHEREUM_RINKEBY:
    case ChainId.ETHEREUM_KOVAN:
    case ChainId.ETHEREUM_GOERLI:
    case ChainId.ETHEREUM_SEPOLIA:
      return {
        chainId: hexChainId,
        chainName,
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: [chainConfig.rpcURL],
        blockExplorerUrls: ['https://etherscan.io']
      }
    default:
      // Default to Ethereum mainnet
      return {
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: ['https://mainnet.infura.io/v3/'],
        blockExplorerUrls: ['https://etherscan.io']
      }
  }
}

/**
 * Get provider chain ID
 */
export const getProviderChainId = async (provider: Provider): Promise<ChainId> => {
  const chainIdHex = await provider.request({ method: 'eth_chainId' })
  return parseInt(chainIdHex as string, 16) as ChainId
}

/**
 * Debug logger for auth operations
 */
export const debugLog = (message: string, data?: unknown, debug = false): void => {
  if (debug && typeof console !== 'undefined') {
    console.log(`[Auth] ${message}`, data || '')
  }
}

/**
 * Build redirect URL for authentication
 */
export const buildRedirectUrl = (config: AuthConfig, pathname: string, search: string): string => {
  const searchParams = new URLSearchParams(search)
  const currentRedirectTo = searchParams.get('redirectTo')

  // Determine if we should use basePath
  const basePath = config.shouldUseBasePath?.(window.location.host) ? config.basePath : ''

  const redirectTo = !currentRedirectTo ? `${basePath}${pathname}${search}` : `${basePath}${currentRedirectTo}`

  return `${config.authUrl}/login?redirectTo=${redirectTo}`
}
