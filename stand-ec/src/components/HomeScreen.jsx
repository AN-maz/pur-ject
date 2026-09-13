import React from "react";
import { ArrowRight, Bomb, Puzzle, Search, Skull, Zap } from "lucide-react";
import { SoundEngine } from "../lib/sound";

const GAMES = [
  { id: "VOCAB_RUSH", title: "Vocab Rush ⚡", tag: "Fast-Paced", desc: "Survival vocab 30 detik! Kejar streak & poin tertinggi.", gradient: "from-amber-500 to-red-600", Icon: Zap, featured: true },
  { id: "WORD_SCRAMBLE", title: "Word Scramble 🧩", tag: "Brain Teaser", desc: "Susun huruf acak jadi kata Bahasa Inggris yang tepat.", gradient: "from-blue-500 to-indigo-600", Icon: Puzzle },
  { id: "GEN_Z", title: "Gen Z English 💀", tag: "Viral Slang", desc: "Seberapa Gen Z bahasa Inggris lu? Cek Aura & Slang score!", gradient: "from-fuchsia-600 to-purple-800", Icon: Skull },
  { id: "IMPOSTOR", title: "Find Impostor 🕵️", tag: "Focus Test", desc: "Cari 1 kata asing yang tidak cocok dalam 5 detik!", gradient: "from-emerald-500 to-teal-700", Icon: Search },
  { id: "GRAMMAR_BOMB", title: "Grammar Bomb 💣", tag: "High Pressure", desc: "Jinakkan bom sebelum meledak! Pilih tata bahasa yang benar.", gradient: "from-ec-red to-rose-800", Icon: Bomb },
];

export default React.memo(function HomeScreen({ onSelectGame }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <span className="bg-ec-red/20 text-red-400 border border-ec-red/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block">🔥 Stand Challenge Active</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">CHOOSE YOUR CHALLENGE</h2>
        <p className="text-blue-200/80 max-w-md mx-auto text-sm md:text-base">Mainkan game favoritmu, kumpulkan skor, dan buktikan kemampuan Bahasa Inggris kamu!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {GAMES.map((g) => (
          <div key={g.id} onClick={() => { SoundEngine.tick(); onSelectGame(g.id); }} className={`group relative overflow-hidden rounded-2xl glass-card p-5 cursor-pointer hover:border-white/40 transition-all transform hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between border-l-4 ${g.featured ? "md:col-span-2 bg-gradient-to-r from-ec-blue via-ec-blue to-ec-red/30" : ""}`}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/10 text-white/90">{g.tag}</span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}><g.Icon size={20} /></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-1 text-white group-hover:text-amber-300 transition">{g.title}</h3>
              <p className="text-xs md:text-sm text-blue-200/70">{g.desc}</p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-amber-400 group-hover:translate-x-1 transition">PLAY NOW <ArrowRight size={14} className="ml-2" /></div>
          </div>
        ))}
      </div>
    </div>
  );
});
