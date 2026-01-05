# 🔐 Authentication Hooks Library


A production-ready, type-safe authentication library for React applications with Web3 wallet integration, identity management, and network switching capabilities.

## ✨ Features

- 🔒 **Type-safe** - Full TypeScript support with strict typing
- 🌐 **Multi-chain Support** - Ethereum, Polygon, BSC, and more
- 🔑 **Identity Management** - Decentraland Single Sign-On integration
- 🔄 **Network Switching** - Automatic chain detection and switching
- 🛡️ **Error Handling** - Robust error handling and fallbacks
- 🎯 **Production Ready** - Comprehensive logging, debugging, and performance optimized
- 🔧 **Configurable** - Flexible configuration for different project needs
- 📦 **Lightweight** - Minimal dependencies and small bundle size
- ♿ **SSR Compatible** - Works with server-side rendering
- 🔌 **Library Ready** - No hardcoded dependencies, fully configurable

## 📦 Installation

```bash
npm install @dcl/schemas decentraland-connect @dcl/single-sign-on-client
```

## 🚀 Quick Start

### 1. Basic Setup

```tsx
import { AuthProvider, useAuth, createAuthConfig } from './contexts/auth'
import { ChainId } from '@dcl/schemas'

// Configure your auth settings
const authConfig = createAuthConfig({
  defaultChainId: ChainId.ETHEREUM_MAINNET,
  authUrl: '/auth',
  basePath: '/my-app'
})

// Wrap your app with AuthProvider
function App() {
  return (
    <AuthProvider config={authConfig}>
      <MyComponent />
    </AuthProvider>
  )
}

// Use auth in any component
function MyComponent() {
  const { wallet, isSignedIn, signIn, signOut } = useAuth()

  return (
    <div>
      {isSignedIn ? (
        <div>
          <p>Wallet: {wallet}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  )
}
```

### 2. With Custom Avatar Fetcher

```tsx
import { AuthProvider, createAuthConfig } from './contexts/auth'

// Custom avatar fetching function
const customFetchAvatar = async (address: string) => {
  const response = await fetch(`/api/profiles/${address}`)
  const data = await response.json()
  return data.avatar
}

const authConfig = createAuthConfig({
  defaultChainId: ChainId.POLYGON_MAINNET,
  authUrl: 'https://auth.mydapp.com',
  basePath: '/dapp',
  fetchAvatar: customFetchAvatar,
  debug: true
})

function App() {
  return (
    <AuthProvider config={authConfig}>
      <MyApp />
    </AuthProvider>
  )
}
```

## 📁 File Structure

```
src/
├── contexts/auth/          # 🎯 Core auth logic & React context
│   ├── types.ts           # TypeScript definitions
│   ├── utils.ts           # Utilities & configuration
│   ├── AuthProvider.tsx   # React provider component
│   ├── index.ts           # Main exports
│   └── README.md          # This documentation
```

## 📚 API Reference

### Components

#### `AuthProvider`

```tsx
interface AuthProviderProps {
  children: React.ReactNode
  config: AuthConfig // Required: Auth configuration
}
```

**Required Props:**

- `config` - Authentication configuration object

**Example:**

```tsx
<AuthProvider
  config={{
    defaultChainId: ChainId.ETHEREUM_MAINNET,
    authUrl: '/auth',
    basePath: '/jump',
    shouldUseBasePath: host => host.includes('mydomain.com'),
    fetchAvatar: customAvatarFetcher,
    debug: false
  }}
>
  <App />
</AuthProvider>
```

### Hooks

#### `useAuth(options?)`

Returns the auth context with all authentication functions.

```tsx
const {
  wallet, // Current wallet address
  chainId, // Current chain ID
  avatar, // User avatar data
  isSignedIn, // Authentication status
  isConnecting, // Loading state
  signIn, // Function to initiate sign in
  signOut, // Function to sign out
  changeNetwork // Function to switch networks
} = useAuth()
```

### Configuration

#### `createAuthConfig(config)`

Creates a validated auth configuration with defaults.

```tsx
const config = createAuthConfig({
  defaultChainId: ChainId.ETHEREUM_MAINNET,
  authUrl: '/auth',
  basePath: '/my-app'
  // ... other options
})
```

#### `AuthConfig` Interface

```tsx
interface AuthConfig {
  defaultChainId: ChainId // Starting chain ID
  authUrl: string // Auth service URL
  basePath: string // App base path
  shouldUseBasePath?: (host: string) => boolean // Host check function
  fetchAvatar?: (address: string) => Promise<Avatar> // Avatar fetcher
  debug: boolean // Debug mode
}
```

## 🔧 Configuration Options

| Option              | Type                                   | Default                   | Description                           |
| ------------------- | -------------------------------------- | ------------------------- | ------------------------------------- |
| `defaultChainId`    | `ChainId`                              | Required                  | Starting blockchain network           |
| `authUrl`           | `string`                               | Required                  | Authentication service URL            |
| `basePath`          | `string`                               | Required                  | Base path for redirects               |
| `shouldUseBasePath` | `(host: string) => boolean`            | Decentraland domain check | Function to determine if use basePath |
| `fetchAvatar`       | `(address: string) => Promise<Avatar>` | Decentraland profile API  | Custom avatar fetching function       |
| `debug`             | `boolean`                              | `development` mode        | Enable debug logging                  |

## 🌐 Supported Networks

- **Ethereum**: Mainnet, Sepolia, Goerli
- **Polygon**: Mainnet, Mumbai, Amoy
- **Binance Smart Chain**: Mainnet
- **Optimism**: Mainnet
- **Arbitrum**: Mainnet
- **Fantom**: Mainnet
- **Avalanche**: Mainnet

## 🎯 Usage Examples

### Complete Implementation

```tsx
// 1. Setup configuration
// src/auth.config.ts
import { createAuthConfig, defaultFetchAvatar } from './contexts/auth'
import { ChainId } from '@dcl/schemas'

export const authConfig = createAuthConfig({
  defaultChainId: ChainId.ETHEREUM_MAINNET,
  authUrl: 'https://auth.mydapp.com',
  basePath: '/dapp',
  shouldUseBasePath: host => host.includes('mydapp.com'),
  fetchAvatar: defaultFetchAvatar,
  debug: process.env.NODE_ENV === 'development'
})

// 2. Setup your app
// src/main.tsx
import { AuthProvider } from './contexts/auth'
import { authConfig } from './auth.config'

function App() {
  return (
    <AuthProvider config={authConfig}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

// 3. Use in components
// src/components/AuthButton.tsx
import { useAuth } from '../contexts/auth'

function AuthButton() {
  const { wallet, isSignedIn, isConnecting, signIn, signOut } = useAuth()

  if (isConnecting) {
    return <div>Connecting...</div>
  }

  return (
    <div>
      {isSignedIn ? (
        <div>
          <span>
            Welcome {wallet?.slice(0, 6)}...{wallet?.slice(-4)}
          </span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signIn}>Connect Wallet</button>
      )}
    </div>
  )
}

// 4. Network switching
// src/components/NetworkSwitcher.tsx
import { useAuth } from '../contexts/auth'
import { ChainId } from '@dcl/schemas'

function NetworkSwitcher() {
  const { chainId, changeNetwork } = useAuth()

  const networks = [
    { id: ChainId.ETHEREUM_MAINNET, name: 'Ethereum' },
    { id: ChainId.POLYGON_MAINNET, name: 'Polygon' },
    { id: ChainId.BSC_MAINNET, name: 'BSC' }
  ]

  return (
    <select value={chainId} onChange={e => changeNetwork(Number(e.target.value) as ChainId)}>
      {networks.map(network => (
        <option key={network.id} value={network.id}>
          {network.name}
        </option>
      ))}
    </select>
  )
}
```

### Custom Avatar Fetcher

```tsx
import { createAuthConfig } from './contexts/auth'

// Custom avatar fetching for your API
const customFetchAvatar = async (address: string) => {
  try {
    const response = await fetch(`/api/users/${address}/avatar`)
    if (!response.ok) return undefined

    const data = await response.json()
    return {
      bodyShape: data.bodyShape,
      wearables: data.wearables,
      emotes: data.emotes
    }
  } catch (error) {
    console.error('Failed to fetch avatar:', error)
    return undefined
  }
}

const config = createAuthConfig({
  defaultChainId: ChainId.ETHEREUM_MAINNET,
  authUrl: '/auth',
  basePath: '/app',
  fetchAvatar: customFetchAvatar
})
```

### Debug Mode

```tsx
const debugConfig = createAuthConfig({
  defaultChainId: ChainId.ETHEREUM_SEPOLIA,
  authUrl: '/auth',
  basePath: '/dev',
  debug: true // Enables detailed console logging
})

<AuthProvider config={debugConfig}>
  <App />
</AuthProvider>
```

## 🧪 Testing

```tsx
import { render } from '@testing-library/react'
import { AuthProvider, createAuthConfig } from './contexts/auth'
import { ChainId } from '@dcl/schemas'

const testConfig = createAuthConfig({
  defaultChainId: ChainId.ETHEREUM_MAINNET,
  authUrl: '/test-auth',
  basePath: '/test',
  fetchAvatar: jest.fn().mockResolvedValue(undefined),
  debug: false
})

function renderWithAuth(component: ReactElement) {
  return render(<AuthProvider config={testConfig}>{component}</AuthProvider>)
}

// Test usage
test('should display sign in button when not authenticated', () => {
  const { getByText } = renderWithAuth(<AuthButton />)
  expect(getByText('Connect Wallet')).toBeInTheDocument()
})
```

## 🚀 Library Usage

This library is designed to be extracted and used across multiple projects:

### Installation as NPM Package

```bash
npm install @your-org/auth-hooks
```

### Usage in Any Project

```tsx
import { AuthProvider, useAuth, createAuthConfig } from '@your-org/auth-hooks'

// Each project provides its own configuration
const myAppConfig = createAuthConfig({
  defaultChainId: ChainId.POLYGON_MAINNET,
  authUrl: 'https://auth.myproject.com',
  basePath: '/my-project',
  fetchAvatar: myCustomAvatarFetcher
})

function MyApp() {
  return (
    <AuthProvider config={myAppConfig}>
      <Router />
    </AuthProvider>
  )
}
```

## 🚀 Production Checklist

- ✅ **Pass config as props** - No hardcoded configuration in provider
- ✅ **Configure chain ID** - Set appropriate blockchain network
- ✅ **Set auth URL** - Point to your authentication service
- ✅ **Configure base path** - Set correct app routing path
- ✅ **Custom avatar fetcher** - Implement for your API if needed
- ✅ **Disable debug in production** - Set `debug: false`
- ✅ **Handle network errors** - Library handles gracefully
- ✅ **Test wallet connections** - Verify MetaMask integration
- ✅ **SSR compatibility** - Safe for server rendering

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

---

Made with ❤️ for the Web3 community
