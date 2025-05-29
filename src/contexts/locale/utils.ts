import { getIntl } from './intlSingleton'
import { LocaleCode, LocaleConfig, LocaleError, LocaleDisplayNames, Messages } from './types'

/**
 * Get supported locales from messages object
 */
export const getSupportedLocales = (messages: Record<string, Messages>): readonly string[] => {
  return Object.keys(messages) as readonly string[]
}

/**
 * Default configuration for locale management
 */
export const createDefaultLocaleConfig = <T extends readonly string[]>(
  supportedLocales: T,
  defaultLocale: T[number],
  storageKey = 'dcl-locale'
): LocaleConfig<T> => ({
  supportedLocales,
  defaultLocale,
  storageKey,
  detectBrowserLocale: true,
  persistLocale: true,
  debug: process.env.NODE_ENV === 'development'
})

/**
 * Default display names for common locales
 */
export const DEFAULT_DISPLAY_NAMES: LocaleDisplayNames = {
  en: 'English',
  es: 'Español',
  zh: '中文'
}

/**
 * Safely access localStorage with error handling
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window === 'undefined') return null
      return localStorage.getItem(key)
    } catch (error) {
      console.warn(`Failed to read from localStorage: ${error}`)
      return null
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window === 'undefined') return false
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn(`Failed to write to localStorage: ${error}`)
      return false
    }
  },

  removeItem: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`Failed to remove from localStorage: ${error}`)
      return false
    }
  }
}

/**
 * Detect browser locale with fallback support
 */
export const detectBrowserLocale = <T extends readonly LocaleCode[]>(supportedLocales: T, defaultLocale: T[number]): T[number] => {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  try {
    // Check primary browser language
    const browserLang = navigator.language.split('-')[0]
    if (supportedLocales.includes(browserLang as T[number])) {
      return browserLang as T[number]
    }

    // Check all browser languages
    for (const lang of navigator.languages) {
      const locale = lang.split('-')[0]
      if (supportedLocales.includes(locale as T[number])) {
        return locale as T[number]
      }
    }
  } catch (error) {
    console.warn(`Failed to detect browser locale: ${error}`)
  }

  return defaultLocale
}

/**
 * Get stored locale with validation
 */
export const getStoredLocale = <T extends readonly LocaleCode[]>(config: LocaleConfig<T>): T[number] => {
  if (!config.persistLocale) {
    return config.detectBrowserLocale ? detectBrowserLocale(config.supportedLocales, config.defaultLocale) : config.defaultLocale
  }

  const stored = safeLocalStorage.getItem(config.storageKey)

  if (stored && config.supportedLocales.includes(stored as T[number])) {
    return stored as T[number]
  }

  return config.detectBrowserLocale ? detectBrowserLocale(config.supportedLocales, config.defaultLocale) : config.defaultLocale
}

/**
 * Store locale with error handling
 */
export const setStoredLocale = <T extends readonly LocaleCode[]>(locale: T[number], config: LocaleConfig<T>): boolean => {
  if (!config.persistLocale) {
    return true // Don't persist, but don't error
  }

  if (!config.supportedLocales.includes(locale)) {
    throw new LocaleError(`Unsupported locale: ${locale}. Supported locales: ${config.supportedLocales.join(', ')}`, 'UNSUPPORTED_LOCALE')
  }

  return safeLocalStorage.setItem(config.storageKey, locale)
}

/**
 * Validate locale code
 */
export const isValidLocale = <T extends readonly LocaleCode[]>(locale: string, supportedLocales: T): locale is T[number] => {
  return supportedLocales.includes(locale as T[number])
}

/**
 * Get display name for locale
 */
export const getLocaleDisplayName = (locale: LocaleCode, displayNames: LocaleDisplayNames = DEFAULT_DISPLAY_NAMES): string => {
  return displayNames[locale] || locale.toUpperCase()
}

/**
 * Flatten nested message objects for react-intl
 */
export const flattenMessages = (nestedMessages: Record<string, unknown>, prefix = ''): Record<string, string> => {
  return Object.keys(nestedMessages).reduce(
    (messages, key) => {
      const value = nestedMessages[key]
      const prefixedKey = prefix ? `${prefix}.${key}` : key

      if (typeof value === 'string') {
        messages[prefixedKey] = value
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(messages, flattenMessages(value as Record<string, unknown>, prefixedKey))
      }

      return messages
    },
    {} as Record<string, string>
  )
}

/**
 * Debug logger for locale operations
 */
export const debugLog = (message: string, data?: unknown, debug = false): void => {
  if (debug && typeof console !== 'undefined') {
    console.log(`[Locale] ${message}`, data || '')
  }
}

/**
 * Format a message using the current locale
 * @param id - The message key (e.g., 'card.event.add_to_calendar')
 * @param values - Optional values for interpolation (e.g., { value: 3 })
 * @returns Formatted message string (e.g., "3 hours ago")
 */
export const formatMessage = (id: string, values?: Record<string, string | number | Date | boolean | null | undefined>): string => {
  return getIntl().formatMessage({ id }, values)
}
