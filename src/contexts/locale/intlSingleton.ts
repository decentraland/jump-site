import { IntlShape, createIntl, createIntlCache } from 'react-intl'
import { messages as defaultMessages } from '../../intl'

// Create a singleton cache for performance
const cache = createIntlCache()

class IntlSingleton {
  private static instance: IntlSingleton
  private intl: IntlShape

  private constructor() {
    this.intl = createIntl(
      {
        locale: 'en',
        messages: defaultMessages.en
      },
      cache
    )
  }

  public static getInstance(): IntlSingleton {
    if (!IntlSingleton.instance) {
      IntlSingleton.instance = new IntlSingleton()
    }
    return IntlSingleton.instance
  }

  public updateIntl(locale: string, messages: Record<string, string>): void {
    this.intl = createIntl({ locale, messages }, cache)
  }

  public getIntl(): IntlShape {
    return this.intl
  }
}

// Export a singleton instance
const intlSingleton = IntlSingleton.getInstance()

// Export only the methods we want to expose
export const updateIntl = (locale: string, messages: Record<string, string>): void => intlSingleton.updateIntl(locale, messages)

export const getIntl = (): IntlShape => intlSingleton.getIntl()
