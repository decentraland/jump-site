import { memo, type FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from './components/Pages/MainPage'
import { usePageTracking } from './hooks/usePageTracking'

export const AppRoutes: FC = memo(() => {
  usePageTracking()

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  )
})
