import React from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Sun, Moon, Printer } from 'lucide-react';

export function SlideControls({ 
  current, 
  total, 
  onPrev, 
  onNext, 
  isFullscreen, 
  onToggleFullscreen,
  darkMode,
  onToggleDarkMode,
  onExportPDF
}) {
  return (
    <div className={`flex items-center justify-between px-6 py-3 rounded-full shadow-xl max-w-xl mx-auto w-full border transition-colors duration-300 ${
      darkMode ? 'bg-neutral-900/90 border-neutral-800 text-white' : 'bg-white/90 border-neutral-200 text-neutral-800'
    }`}>
      <button
        onClick={onPrev}
        disabled={current === 0}
        className={`p-2 rounded-full transition cursor-pointer disabled:opacity-20 disabled:hover:bg-transparent ${
          darkMode ? 'hover:text-software-bright hover:bg-neutral-800' : 'hover:text-software-teal hover:bg-neutral-100'
        }`}
      >
        <ChevronLeft size={24} />
      </button>
      
      <span className="font-medium text-sm tracking-wider select-none">
        Slide <span className={`font-bold font-mono text-base ${darkMode ? 'text-software-bright' : 'text-software-teal'}`}>{current + 1}</span> / {total}
      </span>

      <div className="flex items-center gap-1.5">
        {/* Tombol Export PDF */}
        <button
          onClick={onExportPDF}
          className={`p-2 rounded-full transition cursor-pointer ${
            darkMode ? 'text-neutral-400 hover:text-software-bright hover:bg-neutral-800' : 'text-neutral-500 hover:text-software-teal hover:bg-neutral-100'
          }`}
          title="Export ke PDF (Cetak)"
        >
          <Printer size={20} />
        </button>

        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-full transition cursor-pointer ${
            darkMode ? 'text-neutral-400 hover:text-amber-400 hover:bg-neutral-800' : 'text-neutral-500 hover:text-indigo-600 hover:bg-neutral-100'
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={onToggleFullscreen}
          className={`p-2 rounded-full transition cursor-pointer ${
            darkMode ? 'text-neutral-400 hover:text-software-tosca hover:bg-neutral-800' : 'text-neutral-500 hover:text-software-teal hover:bg-neutral-100'
          }`}
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>

      <button
        onClick={onNext}
        disabled={current === total - 1}
        className={`p-2 rounded-full transition cursor-pointer disabled:opacity-20 disabled:hover:bg-transparent ${
          darkMode ? 'hover:text-software-bright hover:bg-neutral-800' : 'hover:text-software-teal hover:bg-neutral-100'
        }`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}