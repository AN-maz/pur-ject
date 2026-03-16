import { BrowserRouter, Routes, Route }from "react-router-dom"

import Home from './pages/Home'
import LiveReport from './pages/LiveReport'
import ModeSelection from './pages/ModeSelection'

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mode" element={<LiveReport />}></Route>
          <Route path="/camera" element={<ModeSelection />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App