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
        <Route path="/places">
          <Route index element={<PlacesPage />} />
          <Route path="invalid" element={<InvalidPage isEventPage={false} />} />
        </Route>
        <Route path="/events">
          <Route index element={<EventsPage />} />
          <Route path="invalid" element={<InvalidPage isEventPage={true} />} />
        </Route>
        <Route path="*" element={<PlacesPage />} />
      </Route>
    </Routes>
  )
})
