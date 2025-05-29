import { config } from '../config'
import { useAuth } from '../contexts/auth'

export function useRequireAuth<T extends (...args: unknown[]) => unknown>(callback: T): T {
  const { isSignedIn } = useAuth()

  return ((...args: unknown[]) => {
    if (!isSignedIn) {
      window.location.href = `${config.get('AUTH_URL')}/login?redirectTo=${encodeURIComponent(window.location.href)}`
      return
    }
    return callback(...args)
  }) as T
}
