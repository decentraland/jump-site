import { memo, type FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { EventsPage } from './components/Pages/EventsPage'
import { InvalidPage } from './components/Pages/InvalidPage'
import { PlacesPage } from './components/Pages/PlacesPage'
import { usePageTracking } from './hooks/usePageTracking'

export const AppRoutes: FC = memo(() => {
  usePageTracking()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/places/invalid" element={<InvalidPage isEventPage={false} />} />
        <Route path="/events/invalid" element={<InvalidPage isEventPage={true} />} />
        <Route path="*" element={<PlacesPage />} />
      </Route>
    </Routes>
  )
})
