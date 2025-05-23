# 🌍 Internationalization Hooks Library

A production-ready, type-safe internationalization (i18n) library for React applications with localStorage persistence, browser locale detection, and comprehensive TypeScript support.

## ✨ Features

- 🔒 **Type-safe** - Full TypeScript support with strict typing
- 💾 **Persistence** - LocalStorage integration with cross-tab synchronization
- 🌐 **Browser Detection** - Automatic locale detection from user preferences
- 🛡️ **Error Handling** - Robust error handling and fallbacks
- 🎯 **Production Ready** - Comprehensive logging, debugging, and performance optimized
- 🔧 **Configurable** - Flexible configuration for different project needs
- 📦 **Lightweight** - Minimal dependencies and small bundle size
- ♿ **SSR Compatible** - Works with server-side rendering
- 🔌 **Library Ready** - No hardcoded messages, fully configurable

## 📦 Installation

```bash
npm install react react-intl
```

## 🚀 Quick Start

### 1. Prepare Your Messages

```tsx
// messages.ts
import { flattenMessages } from './contexts/locale'

const messages = {
  en: flattenMessages({
    nav: { home: 'Home', about: 'About' },
    common: { save: 'Save', cancel: 'Cancel' }
  }),
  es: flattenMessages({
    nav: { home: 'Inicio', about: 'Acerca de' },
    common: { save: 'Guardar', cancel: 'Cancelar' }
  })
}

export default messages
```

### 2. Basic Setup

```tsx
import { LocaleProvider, useLocale } from './contexts/locale'
import messages from './messages'

// Wrap your app with LocaleProvider
function App() {
  return (
    <LocaleProvider messages={messages} supportedLocales={['en', 'es'] as const} defaultLocale="en">
      <MyComponent />
    </LocaleProvider>
  )
}

// Use the locale in any component
function MyComponent() {
  const { locale, setLocale, supportedLocales } = useLocale()

  return (
    <div>
      <p>Current locale: {locale}</p>
      <select value={locale} onChange={e => setLocale(e.target.value)}>
        {supportedLocales.map(loc => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  )
}
```

### 3. With Custom Configuration

```tsx
import { LocaleProvider, createLocaleConfig } from './contexts/locale'
import messages from './messages'

const customConfig = createLocaleConfig({
  supportedLocales: ['en', 'es', 'fr'] as const,
  defaultLocale: 'en',
  storageKey: 'my-app-locale',
  detectBrowserLocale: true,
  persistLocale: true,
  debug: process.env.NODE_ENV === 'development'
})

function App() {
  return (
    <LocaleProvider messages={messages} supportedLocales={['en', 'es', 'fr'] as const} defaultLocale="en" config={customConfig}>
      <MyApp />
    </LocaleProvider>
  )
}
```

## 📁 File Structure

```
src/
├── contexts/locale/          # 🎯 Core locale logic & React context
│   ├── types.ts             # TypeScript definitions
│   ├── utils.ts             # Utilities & configuration
│   ├── LocaleProvider.tsx   # React provider component
│   ├── index.ts            # Main exports
│   └── README.md           # This documentation
└── intl/                   # 📝 Messages & translations
    ├── en.json             # English messages
    ├── es.json             # Spanish messages (future)
    └── index.ts            # Flattened messages export
```

## 📚 API Reference

### Components

#### `LocaleProvider`

```tsx
interface LocaleProviderProps {
  children: ReactNode
  messages: Record<string, Messages> // Required: All locale messages
  supportedLocales: readonly string[] // Required: Array of locale codes
  defaultLocale?: string // Optional: Defaults to first locale
  config?: Partial<LocaleConfig> // Optional: Custom configuration
  displayNames?: Record<string, string> // Optional: Human-readable names
}
```

**Required Props:**

- `messages` - Object containing flattened messages for each locale
- `supportedLocales` - Array of supported locale codes

**Example:**

```tsx
<LocaleProvider
  messages={{
    en: { 'nav.home': 'Home', 'nav.about': 'About' },
    es: { 'nav.home': 'Inicio', 'nav.about': 'Acerca de' }
  }}
  supportedLocales={['en', 'es'] as const}
  defaultLocale="en"
>
  <App />
</LocaleProvider>
```

### Hooks

#### `useLocale(options?)`

Returns the locale context with all locale management functions.

```tsx
const {
  locale, // Current active locale
  setLocale, // Function to change locale
  supportedLocales, // Array of supported locales
  isValidLocale, // Validation function
  getLocaleDisplayName // Get human-readable name
} = useLocale()
```

### Utilities

#### `flattenMessages(messages)`

Flattens nested message objects for react-intl.

```tsx
const flatMessages = flattenMessages({
  nav: { home: 'Home', about: 'About' }
})
// Result: { 'nav.home': 'Home', 'nav.about': 'About' }
```

#### `createLocaleConfig(config)`

Creates a validated locale configuration with defaults.

```tsx
const config = createLocaleConfig({
  supportedLocales: ['en', 'es'] as const,
  defaultLocale: 'en'
  // ... other options
})
```

## 🔧 Configuration Options

| Option                | Type                | Default        | Description                     |
| --------------------- | ------------------- | -------------- | ------------------------------- |
| `supportedLocales`    | `readonly string[]` | Required       | Array of supported locale codes |
| `defaultLocale`       | `string`            | First locale   | Fallback locale                 |
| `storageKey`          | `string`            | `'dcl-locale'` | LocalStorage key (from config)  |
| `detectBrowserLocale` | `boolean`           | `true`         | Auto-detect from browser        |
| `persistLocale`       | `boolean`           | `true`         | Save to localStorage            |
| `debug`               | `boolean`           | `false`        | Enable debug logging            |

## 🌐 Locale Detection Priority

1. **Stored preference** - Previously saved user choice
2. **Browser language** - User's browser settings (if enabled)
3. **Default locale** - Configured fallback

## 🎯 Usage Examples

### Complete Implementation

```tsx
// 1. Create your messages
// src/intl/en.json
{
  "nav": {
    "home": "Home",
    "about": "About"
  },
  "auth": {
    "login": "Log In",
    "logout": "Log Out"
  }
}

// 2. Export flattened messages
// src/intl/index.ts
import { flattenMessages } from '../contexts/locale'
import en from './en.json'
import es from './es.json'

export const messages = {
  en: flattenMessages(en),
  es: flattenMessages(es)
}

// 3. Setup your app
// src/main.tsx
import { LocaleProvider } from './contexts/locale'
import { messages } from './intl'

function App() {
  return (
    <LocaleProvider
      messages={messages}
      supportedLocales={['en', 'es'] as const}
      defaultLocale="en"
    >
      <MyApp />
    </LocaleProvider>
  )
}

// 4. Use in components
// src/components/Navigation.tsx
import { FormattedMessage } from 'react-intl'
import { useLocale } from '../contexts/locale'

function Navigation() {
  const { locale, setLocale, supportedLocales } = useLocale()

  return (
    <nav>
      <FormattedMessage id="nav.home" />
      <select value={locale} onChange={e => setLocale(e.target.value)}>
        {supportedLocales.map(loc => (
          <option key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>
    </nav>
  )
}
```

### Custom Display Names

```tsx
const customNames = {
  en: 'English (US)',
  es: 'Español (ES)',
  fr: 'Français (FR)'
}

<LocaleProvider
  messages={messages}
  supportedLocales={['en', 'es', 'fr'] as const}
  displayNames={customNames}
>
  <App />
</LocaleProvider>
```

### Debug Mode

```tsx
const debugConfig = createLocaleConfig({
  supportedLocales: ['en', 'es'] as const,
  defaultLocale: 'en',
  debug: true // Enables console logging
})

<LocaleProvider
  messages={messages}
  supportedLocales={['en', 'es'] as const}
  config={debugConfig}
>
  <App />
</LocaleProvider>
```

## 🧪 Testing

```tsx
import { render } from '@testing-library/react'
import { LocaleProvider } from './contexts/locale'

const testMessages = {
  en: { 'test.message': 'Test message' },
  es: { 'test.message': 'Mensaje de prueba' }
}

const testConfig = createLocaleConfig({
  supportedLocales: ['en', 'es'] as const,
  defaultLocale: 'en',
  persistLocale: false, // Disable for tests
  detectBrowserLocale: false
})

function renderWithLocale(component: ReactElement) {
  return render(
    <LocaleProvider messages={testMessages} supportedLocales={['en', 'es'] as const} config={testConfig}>
      {component}
    </LocaleProvider>
  )
}
```

## 🚀 Library Usage

This library is designed to be extracted and used across multiple projects:

### Installation as NPM Package

```bash
npm install @your-org/locale-hooks
```

### Usage in Any Project

```tsx
import { LocaleProvider, useLocale, flattenMessages } from '@your-org/locale-hooks'
import myMessages from './my-project-messages'

// Each project provides its own messages
const messages = {
  en: flattenMessages(myMessages.en),
  es: flattenMessages(myMessages.es)
}

function MyApp() {
  return (
    <LocaleProvider messages={messages} supportedLocales={['en', 'es'] as const}>
      <Router />
    </LocaleProvider>
  )
}
```

## 🚀 Production Checklist

- ✅ **Pass messages as props** - No hardcoded messages in provider
- ✅ **Configure storage key** - Set `STORAGE_LOCALE_KEY` in config
- ✅ **Set supported locales** - Define your app's languages via props
- ✅ **Disable debug in production** - Set `debug: false`
- ✅ **Handle storage errors** - Library handles gracefully
- ✅ **Test cross-tab sync** - Verify localStorage events
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

Made with ❤️ for the React community
