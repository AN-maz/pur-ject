import { Home } from "lucide-react";

export function Header({ activeGame, onHome }) {
  return (
    <header className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
      <div onClick={onHome} className="cursor-pointer flex items-center gap-3 group">
        <div className="w-11 h-11 bg-ec-red rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-ec-red/40 group-hover:scale-105 transition">
          EC
        </div>
        <div>
          <h1 className="text-xl font-black tracking-wider text-white flex items-center gap-2">
            ENGLISH CLUB{" "}
            <span className="text-xs bg-ec-red px-2 py-0.5 rounded-full font-semibold">STAND</span>
          </h1>
          <p className="text-xs text-blue-200/70">Interactive Campus English Games</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {activeGame !== "HOME" && (
          <button
            onClick={onHome}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Home size={14} /> Menu
          </button>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-8 text-center text-xs text-blue-300/40 border-t border-white/5 pt-4">
      English Club Stand Challenge &bull; Built with React &amp; Tailwind CSS
    </footer>
  );
}
