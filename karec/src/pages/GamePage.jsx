import { navigate } from '../routing';
import VocabRushGame from '../games/VocabRush';
import WordScrambleGame from '../games/WordScramble';
import GenZEnglishGame from '../games/GenZEnglish';
import FindImpostorGame from '../games/FindImpostor';
import GrammarBombGame from '../games/GrammarBomb';
import { GAME_META } from '../games/meta';
import { GIcon } from '../games/icons';
import navLogo from '../assets/nav-logo.png';

const GAMES = {
  VOCAB_RUSH: VocabRushGame,
  WORD_SCRAMBLE: WordScrambleGame,
  GEN_Z: GenZEnglishGame,
  IMPOSTOR: FindImpostorGame,
  GRAMMAR_BOMB: GrammarBombGame,
};

export default function GamePage({ game }) {
  const Game = GAMES[game] || GAMES.VOCAB_RUSH;
  const meta = GAME_META.find((g) => g.id === game) || GAME_META[0];

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-4xl mx-auto px-4 py-6 bg-gradient-to-b from-ec-navy via-ec-blue to-ec-navy">
      <header className="flex justify-between items-center pb-4 border-b border-blue-900/60 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-ec-card w-11 h-11 rounded-xl border-2 border-ec-gold flex items-center justify-center shadow-lg">
            <img src={navLogo} alt="English Club UTB" className="h-8 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-white">{meta.title}</h1>
            <p className="text-xs text-blue-200/70">{meta.tag} Quest</p>
          </div>
        </div>

        <button
          onClick={() => navigate('games')}
          className="px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition"
        >
          <GIcon name="back" className="w-3.5 h-3.5" />
          All Quests
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center animate-fade-in" key={game}>
        <Game onHome={() => navigate('home')} onGames={() => navigate('games')} />
      </main>

      <footer className="mt-8 text-center text-xs text-blue-300/40 border-t border-blue-900/40 pt-4">
        English Club Stand Challenge
      </footer>
    </div>
  );
}