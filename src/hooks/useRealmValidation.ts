import { useCallback } from 'react'
import { isEns, isPeerHealthy } from '../utils'
import { fetchWorldContentAbout } from '../utils/worldContentApi'

export interface RealmValidationResult {
  isValid: boolean
  validatedRealmOrWorld?: string
  error?: string
}

/**
 * Custom hook for realm validation logic
 */
export const useRealmValidation = () => {
  const ensureProtocol = useCallback((input: string): string => {
    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(input)
    return hasProtocol ? input : `https://${input}`
  }, [])

  const checkRealmHealth = useCallback(async (realm: string): Promise<boolean> => {
    const isEnsRealm = isEns(realm)

    if (isEnsRealm) {
      try {
        const aboutData = await fetchWorldContentAbout({ world: realm })
        return aboutData.healthy && aboutData.acceptingUsers
      } catch {
        return false
      }
    } else {
      return await isPeerHealthy(realm)
    }
  }, [])

  const validateRealmOrWorld = useCallback(
    async (rawRealmOrWorld: string | undefined): Promise<RealmValidationResult> => {
      // Skip validation for default/main realm or when no realm is provided
      if (!rawRealmOrWorld) {
        return { isValid: true, validatedRealmOrWorld: rawRealmOrWorld }
      }

      try {
        const healthy = await checkRealmHealth(rawRealmOrWorld)

        if (!healthy) {
          return {
            isValid: false,
            error: `The realm ${rawRealmOrWorld} is not healthy or not accepting users`
          }
        }

        return {
          isValid: true,
          validatedRealmOrWorld: rawRealmOrWorld
        }
      } catch (error) {
        return {
          isValid: false,
          error: error instanceof Error ? error.message : 'Unknown validation error'
        }
      }
    },
    [ensureProtocol, checkRealmHealth]
  )

  return {
    validateRealmOrWorld
  }
}
