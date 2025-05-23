import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChainId } from '@dcl/schemas'
import { dark, ThemeProvider } from 'decentraland-ui2/dist/theme'
import { config } from './config'
import { AnalyticsProvider } from './contexts/analytics/AnalyticsProvider'
import { AuthProvider, defaultShouldUseBasePath, defaultFetchAvatar } from './contexts/auth'
import { LocaleProvider, getSupportedLocales } from './contexts/locale'
import { messages } from './intl'
import { AppRoutes } from './Routes'

const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/jump' : '/'

// Create avatar fetcher with project-specific peer URL
const createAvatarFetcher = (peerUrl: string) => (address: string) => defaultFetchAvatar(address, peerUrl)

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider theme={dark}>
        <LocaleProvider
          messages={messages}
          supportedLocales={getSupportedLocales(messages)}
          defaultLocale="en"
          storageKey={config.get('STORAGE_LOCALE_KEY', 'dcl-locale')}
        >
          <AnalyticsProvider writeKey={config.get('SEGMENT_API_KEY')}>
            <AuthProvider
              config={{
                defaultChainId: config.get('CHAIN_ID') as unknown as ChainId,
                authUrl: config.get('AUTH_URL'),
                basePath: '/jump',
                shouldUseBasePath: defaultShouldUseBasePath,
                fetchAvatar: createAvatarFetcher(config.get('PEER_URL')),
                debug: process.env.NODE_ENV === 'development'
              }}
            >
              <AppRoutes />
            </AuthProvider>
          </AnalyticsProvider>
        </LocaleProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
