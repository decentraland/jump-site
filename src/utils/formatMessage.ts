import { messages } from '../intl'

/**
 * Standalone format message utility that can be used outside React components
 * Uses the same flattened messages as react-intl for consistency
 * @param id - The message key (e.g., 'card.event.add_to_calendar')
 * @param values - Optional values for interpolation
 * @returns Formatted message string
 */
export function formatMessage<T extends Record<string, string | number>>(id?: string | null, values?: T): string {
  if (!id) {
    return ''
  }

  // Get message from flattened messages (same as react-intl)
  const message = messages.en[id]

  if (!message || typeof message !== 'string') {
    return id
  }

  // Simple interpolation - replace {key} with values[key]
  if (!values) {
    return message
  }

  return message.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key] !== undefined ? String(values[key]) : match
  })
}
