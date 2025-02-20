import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { dark } from 'decentraland-ui2/dist/theme'
import { ThemeProvider } from 'decentraland-ui2'

function App() {
  return (
    <ThemeProvider theme={dark}>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  )
}

export default App