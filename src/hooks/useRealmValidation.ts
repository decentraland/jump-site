import { useCallback } from 'react'
import { isEns, isPeerHealthy } from '../utils'
import { isValidDomainOrUrl } from '../utils/placesApi'
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
    async (rawRealm: string | undefined, defaultRealm: string): Promise<RealmValidationResult> => {
      // Skip validation for default/main realm or when no realm is provided
      if (!rawRealm || rawRealm === defaultRealm) {
        return { isValid: true, validatedRealm: rawRealm }
      }

      try {
        const isEnsRealm = isEns(rawRealm)
        let realmToCheck: string

        if (isEnsRealm) {
          realmToCheck = rawRealm
        } else {
          realmToCheck = ensureProtocol(rawRealm)
          if (!isValidDomainOrUrl(realmToCheck)) {
            return {
              isValid: false,
              error: `Invalid domain format: ${rawRealm}`
            }
          }
        }

        const healthy = await checkRealmHealth(realmToCheck, isEnsRealm)
        if (!healthy) {
          const realmType = isEnsRealm ? 'ENS realm' : 'Catalyst server'
          return {
            isValid: false,
            error: `${realmType} ${rawRealm} is not healthy or not accepting users`
          }
        }

        return {
          isValid: true,
          validatedRealm: isEnsRealm ? rawRealm : realmToCheck
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
