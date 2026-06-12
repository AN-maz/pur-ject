import React from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

export function SlideControls({ current, total, onPrev, onNext, isFullscreen, onToggleFullscreen }) {
  return (
    <div className="flex items-center justify-between bg-neutral-900/90 backdrop-blur border border-neutral-800 px-6 py-3 rounded-full shadow-xl max-w-md mx-auto w-full">
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="p-2 rounded-full text-neutral-400 hover:text-software-bright hover:bg-neutral-800 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>
      
      <span className="text-neutral-300 font-medium text-sm tracking-wider select-none">
        Slide <span className="text-software-bright font-bold font-mono text-base">{current + 1}</span> / {total}
      </span>

      <button
        onClick={onToggleFullscreen}
        className="p-2 rounded-full text-neutral-400 hover:text-software-tosca hover:bg-neutral-800 transition cursor-pointer"
        title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh (F)"}
      >
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>

      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="p-2 rounded-full text-neutral-400 hover:text-software-bright hover:bg-neutral-800 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}