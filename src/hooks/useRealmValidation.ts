import { useCallback } from 'react'
import { isEns, isPeerHealthy } from '../utils'
import { fetchWorldContentAbout } from '../utils/worldContentApi'

export interface RealmValidationResult {
  isValid: boolean
  validatedRealm?: string
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

  const checkRealmHealth = useCallback(async (realm: string, isEnsRealm: boolean): Promise<boolean> => {
    if (isEnsRealm) {
      try {
        const aboutData = await fetchWorldContentAbout({ realm })
        return aboutData.healthy && aboutData.acceptingUsers
      } catch {
        return false
      }
    } else {
      return await isPeerHealthy(realm)
    }
  }, [])

  const validateRealm = useCallback(
    async (rawRealm: string | undefined): Promise<RealmValidationResult> => {
      // Skip validation for default/main realm or when no realm is provided
      if (!rawRealm) {
        return { isValid: true, validatedRealm: rawRealm }
      }

      try {
        const isEnsRealm = isEns(rawRealm)

        if (isEnsRealm) {
          const healthy = await checkRealmHealth(rawRealm, isEnsRealm)

          if (!healthy) {
            return {
              isValid: false,
              error: `ENS realm ${rawRealm} is not healthy or not accepting users`
            }
          }
        }

        return {
          isValid: true,
          validatedRealm: rawRealm
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
    validateRealm
  }
}
