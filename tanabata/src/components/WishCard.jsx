import React from 'react';
import { X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishCard({ wish, onClose }) {
  if (!wish) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-2xl p-6"
        >
          {/* Aksen Pita Atas */}
          <div
            className="absolute top-0 left-0 right-0 h-3"
            style={{ backgroundColor: wish.color || '#f43f5e' }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>

          <div className="mt-2 space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full inline-block"
                style={{ backgroundColor: wish.color || '#f43f5e' }}
              />
              <h3 className="font-semibold text-lg text-slate-200">
                {wish.name || 'Anonim'}
              </h3>
            </div>

            <p className="text-slate-300 text-base leading-relaxed bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 italic">
              "{wish.wish}"
            </p>

            <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
              <span>🎋 Harapan Tergantung</span>
              <div className="flex items-center gap-1 text-rose-400">
                <Heart size={14} className="fill-rose-400" />
                <span>Tanabata</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}