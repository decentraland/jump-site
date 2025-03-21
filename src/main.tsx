import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { dark, ThemeProvider } from 'decentraland-ui2/dist/theme';
import { AnalyticsProvider } from './contexts/analytics/AnalyticsProvider';
import { config } from './config';
import { AppRoutes } from './Routes';

const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/jump' : '/';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ThemeProvider theme={dark}>
        <AnalyticsProvider writeKey={config.get('SEGMENT_API_KEY')}>
          <AppRoutes />
        </AnalyticsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
