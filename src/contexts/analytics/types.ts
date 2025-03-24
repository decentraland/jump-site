import type { EventProperties } from '@segment/analytics-next'

export type AnalyticsProviderProps = {
  writeKey: string
  userId?: string
  traits?: Record<string, unknown>
  children: React.ReactNode
}

export type TrackPayload = EventProperties

type UninitializedAnalyticsContext = {
  isInitialized: false
}

type InitializedAnalyticsContext = {
  isInitialized: true
  track: (event: string, payload?: TrackPayload) => void
  identify: (userId: string, traits?: Record<string, unknown>) => void
  page: (name: string, props?: Record<string, unknown>) => void
}

export type AnalyticsContextType = UninitializedAnalyticsContext | InitializedAnalyticsContext
