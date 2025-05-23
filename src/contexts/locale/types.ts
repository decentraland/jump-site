// Core locale types
export type LocaleCode = string
export type MessageKey = string
export type MessageValue = string
export type Messages = Record<MessageKey, MessageValue>
export type LocaleMessages = Record<LocaleCode, Messages>

// Configuration types
export interface LocaleConfig<T extends readonly LocaleCode[]> {
  /** Array of supported locale codes */
  supportedLocales: T
  /** Default locale to fall back to */
  defaultLocale: T[number]
  /** Key used for localStorage persistence */
  storageKey: string
  /** Whether to detect browser locale automatically */
  detectBrowserLocale: boolean
  /** Whether to persist locale choice in localStorage */
  persistLocale: boolean
  /** Debug mode for development */
  debug: boolean
}

// Provider types
export interface LocaleContextValue<T extends readonly LocaleCode[]> {
  /** Current active locale */
  locale: T[number]
  /** Function to change the current locale */
  setLocale: (locale: T[number]) => void
  /** Array of all supported locales */
  supportedLocales: T
  /** Check if a locale string is valid */
  isValidLocale: (locale: string) => locale is T[number]
  /** Get display name for a locale */
  getLocaleDisplayName: (locale: T[number]) => string
}

// Utility types
export interface LocaleDisplayNames {
  [key: string]: string
}

// Error types
export class LocaleError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message)
    this.name = 'LocaleError'
  }
}

// Hook configuration
export interface UseLocaleOptions<T extends readonly LocaleCode[]> {
  /** Custom configuration overrides */
  config?: Partial<LocaleConfig<T>>
  /** Custom display names for locales */
  displayNames?: LocaleDisplayNames
}
