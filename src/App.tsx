import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { dark, ThemeProvider } from 'decentraland-ui2/dist/theme';
import { Home } from './components/Home/Home';

export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={dark}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  );
};
