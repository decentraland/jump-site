import { useCallback } from 'react'
import { useIntl } from 'react-intl'

export const useFormatMessage = () => {
  const intl = useIntl()

  return useCallback(
    function format<T>(id?: string | null, values?: T) {
      if (!id || !intl.messages[id]) {
        return id || ''
      }

      return intl.formatMessage({ id }, { ...values })
    },
    [intl]
  )
}
