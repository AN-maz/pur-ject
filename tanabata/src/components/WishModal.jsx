import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendWish } from '../lib/firebase';

const COLOR_OPTIONS = [
  { name: 'Merah (Semangat)', value: '#f43f5e' },
  { name: 'Biru (Ketenangan)', value: '#38bdf8' },
  { name: 'Kuning (Kekayaan/Karier)', value: '#facc15' },
  { name: 'Hijau (Kesehatan)', value: '#4ade80' },
  { name: 'Ungu (Cita-cita)', value: '#c084fc' },
];

export default function WishModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].value);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wish.trim()) return;

    setLoading(true);
    try {
      await sendWish({
        name: name.trim(),
        wish: wish.trim(),
        color: selectedColor,
      });

      // Trigger efek konfeti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
      });

      setName('');
      setWish('');
      onClose();
    } catch (err) {
      console.error("Gagal mengirim harapan:", err);
      alert("Terjadi kesalahan saat mengirim harapan. Cek koneksi / Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-amber-400" />
              <h2 className="text-lg font-semibold tracking-wide">Tulis Harapanmu</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Nama (Opsional / Boleh Anonim)
              </label>
              <input
                type="text"
                placeholder="cth. Purwa / Kucing Oren"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 text-sm transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Isi Harapan / Doa <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan impian atau harapan terbaikmu di sini..."
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                maxLength={200}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 text-sm transition resize-none"
              />
              <div className="text-right text-[11px] text-slate-500 mt-1">
                {wish.length}/200
              </div>
            </div>

            {/* Pilihan Warna Pita */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                Pilih Warna Pita Tanzaku
              </label>
              <div className="flex gap-3">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setSelectedColor(c.value)}
                    className={`w-7 h-7 rounded-full transition-transform ${
                      selectedColor === c.value
                        ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={loading || !wish.trim()}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl shadow-lg shadow-rose-500/25 transition active:scale-[0.98]"
            >
              <Send size={16} />
              <span>{loading ? 'Menggantung...' : 'Gantungkan di Pohon'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}