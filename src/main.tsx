import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { dark, ThemeProvider } from 'decentraland-ui2/dist/theme'
import { config } from './config'
import { AnalyticsProvider } from './contexts/analytics/AnalyticsProvider'
import { AppRoutes } from './Routes'

const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/jump' : '/'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider theme={dark}>
        <AnalyticsProvider writeKey={config.get('SEGMENT_API_KEY')}>
          <AppRoutes />
        </AnalyticsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
