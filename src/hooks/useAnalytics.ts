import { useContext } from 'react'
import { AnalyticsContext } from '../contexts/analytics/AnalyticsProvider'

export const useAnalytics = () => {
  const analyticsContext = useContext(AnalyticsContext)
  if (!analyticsContext) {
    throw new Error('useAnalytics must be used within AnalyticsProvider')
  }

  // Return no-op functions if analytics is not initialized
  if (!analyticsContext.isInitialized) {
    return {
      track: () => {},
      identify: () => {},
      page: () => {},
      isInitialized: false
    }
  }

  return {
    track: analyticsContext.track,
    identify: analyticsContext.identify,
    page: analyticsContext.page,
    isInitialized: true
  }
}

export enum Events {
  CLICK_JUMP_IN = 'Click on Jump In',
  CLICK_DOWNLOAD = 'Click on Download',
  CLIENT_NOT_INSTALLED = 'Client not installed',
  CLICK_DOWNLOAD_MODAL_CLOSE = 'Click on Download Modal Close'
}
