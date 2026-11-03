import { useEffect, useState } from 'react';
import Home from './pages/Home';
import SplashScreen from './pages/SplashScreen';
import GamesPage from './pages/GamesPage';
import GamePage from './pages/GamePage';
import { subscribe, getRoute } from './routing';

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => subscribe((r) => setRoute({ ...r })), []);

  if (route.page === 'play' && route.game) {
    return <GamePage game={route.game} />;
  }

  if (route.page === 'games') {
    return <GamesPage />;
  }

  if (route.page === 'home') {
    return <Home />;
  }

  return <SplashScreen />;
}

export default App;