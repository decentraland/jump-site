export { LocaleProvider, useLocale } from './LocaleProvider'

// Re-export types for library consumers
export type {
  LocaleCode,
  MessageKey,
  MessageValue,
  Messages,
  LocaleMessages,
  LocaleConfig,
  LocaleContextValue,
  LocaleDisplayNames,
  UseLocaleOptions
} from './types'

// Re-export utilities for advanced usage
export {
  createDefaultLocaleConfig,
  DEFAULT_DISPLAY_NAMES,
  safeLocalStorage,
  detectBrowserLocale,
  getStoredLocale,
  setStoredLocale,
  isValidLocale,
  getLocaleDisplayName,
  flattenMessages,
  debugLog,
  getSupportedLocales
} from './utils'

// Re-export error class
export { LocaleError } from './types'
