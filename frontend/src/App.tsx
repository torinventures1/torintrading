import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Analysis from './pages/Analysis'
import NotFound from './pages/NotFound'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/analysis/:symbol" element={<Analysis />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
