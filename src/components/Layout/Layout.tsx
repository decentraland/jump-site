import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { Navbar } from '../Navbar/Navbar'

export const Layout: FC = memo(() => {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '66px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
})
