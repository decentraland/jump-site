import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  const envVariables = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    define: {
      'process.env': {
        VITE_REACT_APP_DCL_DEFAULT_ENV: envVariables.VITE_REACT_APP_DCL_DEFAULT_ENV,
        VITE_SEGMENT_DEV_API_KEY: envVariables.VITE_SEGMENT_DEV_API_KEY,
        VITE_SEGMENT_PRD_API_KEY: envVariables.VITE_SEGMENT_PRD_API_KEY
      }
    },
    ...(command === 'build' ? { base: envVariables.VITE_BASE_URL } : undefined),
    server: {
      proxy: {
        '/auth': {
          target: 'https://decentraland.zone',
          followRedirects: true,
          changeOrigin: true,
          secure: false,
          ws: true
        }
      }
    }
  }
})
