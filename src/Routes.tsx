import { memo, type FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { EventsPage } from './components/Pages/EventsPage'
import { PlacesPage } from './components/Pages/PlacesPage'
import { usePageTracking } from './hooks/usePageTracking'

export const AppRoutes: FC = memo(() => {
  usePageTracking()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="*" element={<PlacesPage />} />
      </Route>
    </Routes>
  )
})
