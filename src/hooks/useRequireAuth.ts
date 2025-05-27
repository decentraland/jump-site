import { useLocation } from 'react-router-dom'
import { config } from '../config'
import { useAuth } from '../contexts/auth'

export function useRequireAuth<T extends (...args: unknown[]) => unknown>(callback: T): T {
  const { isSignedIn } = useAuth()
  const location = useLocation()
  console.log(`${location.pathname}${location.search}`)
  return ((...args: unknown[]) => {
    if (!isSignedIn) {
      const currentPath = `${location.pathname}${location.search}`
      window.location.href = `${config.get('AUTH_URL')}/?redirectTo=${encodeURIComponent(currentPath)}`
      return
    }
    return callback(...args)
  }) as T
}
