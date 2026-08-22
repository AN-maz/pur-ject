import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, User, Sparkles, ArrowRight } from 'lucide-react';

export default function WishSearchModal({ isOpen, onClose, wishes = [], onSelectWish }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredWishes = wishes.filter((item) =>
    (item.name || 'Anonim').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md rounded-2xl bg-slate-950/95 border border-cyan-500/30 text-white shadow-[0_0_30px_rgba(6,182,212,0.2)] p-5 flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              <h2 className="text-sm font-mono tracking-wider text-cyan-300 uppercase">
                Cari Harapan di Pohon
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mt-4">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Ketik nama pengirim..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-mono transition"
            />
          </div>

          {/* Result List */}
          <div className="mt-4 overflow-y-auto space-y-2 flex-1 pr-1">
            {filteredWishes.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs font-mono">
                Tidak ada nama yang cocok.
              </div>
            ) : (
              filteredWishes.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectWish(item);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: item.color || '#f43f5e', color: item.color || '#f43f5e' }}
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition">
                        {item.name || 'Anonim'}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 italic max-w-[200px]">
                        "{item.wish}"
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}