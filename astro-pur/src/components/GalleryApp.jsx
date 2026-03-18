import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './Background';
import StartScreen from './StartScreen';
import GalleryGrid from './GalleryGrid';

export default function GalleryApp() {
  const [view, setView] = useState('start');
  const audioRef = useRef(null);

  const handleStart = () => {
    setView('gallery');
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleBack = () => {
    setView('start');
  
    clearInterval(window.autoScrollInterval);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen bg-oxigen-dark text-white font-sans overflow-hidden relative">
      <audio ref={audioRef} src="/musik.mp3" loop />

      <Background />
      <AnimatePresence mode="wait">
        
        {view === 'start' && (
          <StartScreen key="start" onStart={handleStart} />
        )}

        {view === 'gallery' && (
          <GalleryGrid key="gallery" onBack={handleBack} />
        )}

      </AnimatePresence>

      <AnimatePresence>
        {view === 'gallery' && (
          <motion.div
            key="wipe"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-oxigen-light origin-top pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}