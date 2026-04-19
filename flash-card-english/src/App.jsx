import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import SessionSetup from './pages/SessionSetup';
import FlashcardMode from './pages/FlashcardMode';
import QuizMode from './pages/QuizMode';
import SessionComplete from './pages/SessionComplete';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/setup" element={<SessionSetup />} />
          <Route path="/session/flashcard" element={<FlashcardMode />} />
          <Route path="/session/quiz" element={<QuizMode />} />
          <Route path="/session/complete" element={<SessionComplete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
