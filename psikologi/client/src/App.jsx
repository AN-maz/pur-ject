import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Import Halaman (akan dibuat di Langkah 4)
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

// Remount TestPage saat testId berubah agar state jawaban di-reset.
function KeyedTestPage() {
  const { testId } = useParams();
  return <TestPage key={testId} />;
}

export default function App() {
  // Pilihan tema: 'serene' | 'warm' | 'clinical'
  const [theme, setTheme] = useState('serene');

  return (
    <Router>
      <div className="min-h-screen bg-app text-theme-main transition-colors duration-300" data-theme={theme}>
        {/* Header / Navbar */}
        <header className="border-b border-theme bg-card sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-theme-primary">
              PsychometricApp
            </Link>

            {/* Selector Tema Warna */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-theme-muted font-medium hidden sm:inline">Tema:</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-app border border-theme text-theme-main rounded-md px-2 py-1 text-xs focus:outline-none"
              >
                <option value="serene">Serene Teal</option>
                <option value="warm">Warm Indigo</option>
                <option value="clinical">Clinical Blue</option>
              </select>
            </div>
          </div>
        </header>

        {/* Konten Utama */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/test/:testId" element={<KeyedTestPage />} />
            <Route path="/result/:testId" element={<ResultPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}