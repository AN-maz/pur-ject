import React, { useEffect, useState } from 'react';
import Canvas3D from './components/Canvas3D';
import { subscribeWishes } from './lib/firebase';
import { Plus } from 'lucide-react';
import WishCard from './components/WishCard';

export default function App() {
  const [wishes, setWishes] = useState([]);
  const [selectedWish, setSelectedWish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Dengarkan data realtime dari Firestore
    const unsubscribe = subscribeWishes((data) => {
      setWishes(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="relative w-screen h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 overflow-hidden select-none">
      {/* Header Info */}
      <header className="absolute top-6 left-6 z-10 text-white pointer-events-none">
        <h1 className="text-2xl font-bold tracking-wide">🎋 Tanabata Wish Tree</h1>
        <p className="text-slate-400 text-sm">Gantungkan harapanmu di pohon bambu.</p>
      </header>

      {/* 3D Scene */}
      <Canvas3D wishes={wishes} onSelectWish={(wish) => setSelectedWish(wish)} />

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-8 right-8 z-10 flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-medium px-5 py-3 rounded-full shadow-lg shadow-rose-500/30 transition-all hover:scale-105 active:scale-95"
      >
        <Plus size={20} />
        <span>Gantung Harapan</span>
      </button>

      <WishCard wish={selectedWish} onClose={() => setSelectedWish(null)} />
    </main>
  );
}