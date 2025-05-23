import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { IntlProvider } from 'react-intl'
import { LocaleConfig, LocaleContextValue, UseLocaleOptions, Messages } from './types'
import {
  createDefaultLocaleConfig,
  getStoredLocale as getStoredLocaleUtil,
  setStoredLocale as setStoredLocaleUtil,
  isValidLocale as isValidLocaleUtil,
  getLocaleDisplayName as getLocaleDisplayNameUtil,
  debugLog,
  DEFAULT_DISPLAY_NAMES
} from './utils'

interface LocaleProviderProps {
  children: ReactNode
  messages: Record<string, Messages>
  supportedLocales: readonly string[]
  defaultLocale?: string
  storageKey?: string
  config?: Partial<LocaleConfig<readonly string[]>>
  displayNames?: Record<string, string>
}

const LocaleContext = createContext<LocaleContextValue<readonly string[]> | undefined>(undefined)

export const LocaleProvider = ({
  children,
  messages,
  supportedLocales,
  defaultLocale,
  storageKey = 'dcl-locale',
  config: userConfig,
  displayNames = DEFAULT_DISPLAY_NAMES
}: LocaleProviderProps) => {
  // Create configuration with provided values
  const defaultConfig = createDefaultLocaleConfig(supportedLocales, defaultLocale || supportedLocales[0], storageKey)

  // Merge user config with defaults
  const config = {
    ...defaultConfig,
    ...userConfig
  } as LocaleConfig<readonly string[]>

  // Initialize locale from storage/browser detection
  const [locale, setLocaleState] = useState<string>(() => {
    const initialLocale = getStoredLocaleUtil(config)
    debugLog('Initial locale detected', initialLocale, config.debug)
    return initialLocale
  })

  // Validate if a locale string is supported
  const isValidLocale = useCallback(
    (locale: string): locale is string => {
      return isValidLocaleUtil(locale, config.supportedLocales)
    },
    [config.supportedLocales]
  )

  // Get display name for a locale
  const getLocaleDisplayName = useCallback(
    (locale: string): string => {
      return getLocaleDisplayNameUtil(locale, displayNames)
    },
    [displayNames]
  )

  // Set locale with validation and persistence
  const setLocale = useCallback(
    (newLocale: string) => {
      try {
        if (!isValidLocale(newLocale)) {
          console.warn(`Invalid locale "${newLocale}". Falling back to "${config.defaultLocale}"`)
          newLocale = config.defaultLocale
        }

        debugLog('Setting locale', { from: locale, to: newLocale }, config.debug)

        setLocaleState(newLocale)
        const success = setStoredLocaleUtil(newLocale, config)

        if (!success && config.persistLocale) {
          console.warn('Failed to persist locale to storage')
        }

        debugLog('Locale set successfully', newLocale, config.debug)
      } catch (error) {
        console.error('Failed to set locale:', error)
        // Fallback to current locale on error
      }
    },
    [locale, config, isValidLocale]
  )

  useEffect(() => {
    // Listen for localStorage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === config.storageKey && e.newValue) {
        const newLocale = e.newValue
        if (isValidLocale(newLocale) && newLocale !== locale) {
          debugLog('Locale changed from another tab', newLocale, config.debug)
          setLocaleState(newLocale)
        }
      }
    }

    // Only add listener if we're persisting and in browser
    if (config.persistLocale && typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
    }

    return () => {
      if (config.persistLocale && typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange)
      }
    }
  }, [locale, config, isValidLocale])

  const contextValue: LocaleContextValue<readonly string[]> = {
    locale,
    setLocale,
    supportedLocales: config.supportedLocales,
    isValidLocale,
    getLocaleDisplayName
  }

  // Get the flattened messages for the current locale
  const currentMessages = messages[locale] || messages[config.defaultLocale] || {}

  return (
    <LocaleContext.Provider value={contextValue}>
      <IntlProvider locale={locale} messages={currentMessages}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  )
}

export const useLocale = (_options?: UseLocaleOptions<readonly string[]>): LocaleContextValue<readonly string[]> => {
  const context = useContext(LocaleContext)

  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return context
}
