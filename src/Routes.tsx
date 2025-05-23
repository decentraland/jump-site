import { memo, type FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { MainPage } from './components/Pages/MainPage'
import { usePageTracking } from './hooks/usePageTracking'

export const AppRoutes: FC = memo(() => {
  usePageTracking()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<MainPage />} />
      </Route>
    </Routes>
  )
})
