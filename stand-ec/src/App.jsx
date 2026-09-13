import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import HomeScreen from "./components/HomeScreen";
import { Footer, Header } from "./components/Layout";
import Photobooth from "./components/Photobooth";
import VocabRush from "./games/VocabRush";
import WordScramble from "./games/WordScramble";
import GenZGame from "./games/GenZGame";
import ImpostorGame from "./games/ImpostorGame";
import GrammarBomb from "./games/GrammarBomb";

export default function App() {
  const [activeGame, setActiveGame] = useState("HOME");
  const [booth, setBooth] = useState(null); // { gameId, result } — cerminan latestResult di EC-GAMES

  const triggerConfetti = useCallback(() => {
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {
      // abaikan kalau gagal
    }
  }, []);

  const goHome = useCallback(() => {
    setActiveGame("HOME");
    setBooth(null);
  }, []);

  const openPhotobooth = useCallback((gameId, result) => {
    setBooth({ gameId, result });
  }, []);

  const backToResult = useCallback(() => {
    // cerminan $('#backResult').onclick = finish(...) — kembali ke result screen game
    setBooth(null);
  }, []);

  const renderGame = useCallback(() => {
    const props = { onConfetti: triggerConfetti, onHome: goHome, onPhotobooth: openPhotobooth };
    switch (activeGame) {
      case "VOCAB_RUSH": return <VocabRush {...props} />;
      case "WORD_SCRAMBLE": return <WordScramble {...props} />;
      case "GEN_Z": return <GenZGame {...props} />;
      case "IMPOSTOR": return <ImpostorGame {...props} />;
      case "GRAMMAR_BOMB": return <GrammarBomb {...props} />;
      default: return null;
    }
  }, [activeGame, triggerConfetti, goHome, openPhotobooth]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-ec-navy via-ec-blue to-black text-white overflow-x-hidden font-jakarta">
      <div className="min-h-screen flex flex-col justify-between max-w-4xl mx-auto px-4 py-6 w-full">
        <Header activeGame={booth ? booth.gameId : activeGame} onHome={goHome} />

        <main className="flex-1 flex flex-col justify-center">
          {activeGame === "HOME" && !booth && <HomeScreen onSelectGame={setActiveGame} />}
          {activeGame !== "HOME" && (
            <div className={booth ? "hidden" : ""}>
              {renderGame()}
            </div>
          )}
          {booth && (
            <Photobooth
              gameId={booth.gameId}
              result={booth.result}
              onBack={backToResult}
              onFinish={goHome}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
