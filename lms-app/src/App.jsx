import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Nanti kita buat komponen-komponen ini
import LandingPage from './pages/LandingPage';
import SilabusPage from './pages/SilabusPage';
import MateriPage from './pages/MateriPage';

function App() {
  return (
    <Router>
      {/* Menggunakan warna custom dari index.css sebagai background utama */}
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-software-teal)' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/materi" element={<SilabusPage />} />
          <Route path="/materi/:id" element={<MateriPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;