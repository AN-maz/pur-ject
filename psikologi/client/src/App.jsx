import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useParams } from 'react-router-dom';
import { Brain } from 'lucide-react';

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

  const navLink = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
      isActive ? 'bg-primary-light text-primary' : 'text-muted hover:text-main'
    }`;

  return (
    <Router>
      <div className="min-h-screen bg-app text-main transition-colors duration-300" data-theme={theme}>
        {/* Header / Navbar */}
        <header className="border-b border-line bg-card sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
            <Link to="/" className="inline-flex items-center gap-1.5 text-lg sm:text-xl font-bold text-primary">
              <Brain size={22} />
              <span className="hidden min-[420px]:inline">PsychometricApp</span>
            </Link>

            <nav className="flex items-center gap-1 sm:gap-3">
              <NavLink to="/" end className={navLink}>
                Beranda
              </NavLink>
              <NavLink to="/menu" className={navLink}>
                Tes
              </NavLink>

              {/* Selector Tema Warna */}
              <div className="flex items-center ml-1">
                <span className="text-muted font-medium hidden md:inline mr-2 text-sm">Tema:</span>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  aria-label="Pilih tema warna"
                  className="bg-app border border-line text-main rounded-md px-2 py-1.5 text-xs focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="serene">Teal</option>
                  <option value="warm">Indigo</option>
                  <option value="clinical">Sky</option>
                </select>
              </div>
            </nav>
          </div>
        </header>

        {/* Konten Utama */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
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