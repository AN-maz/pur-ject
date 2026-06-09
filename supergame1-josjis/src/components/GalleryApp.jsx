import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StartScreen from './StartScreen';
import GalleryGrid from './GalleryGrid';

export default function GalleryApp() {
  const [view, setView] = useState('start');
  const [selectedItem, setSelectedItem] = useState(null);

  
  const [isPlaying, setIsPlaying] = useState(false); 
  const audioRef = useRef(null);

  const handleStart = () => {
    setView('gallery');
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio diblokir:", err));
    }
  };

  const handleBack = () => {
    setView('start');
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false); 
    }
  };


  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Audio diblokir:", err));
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#0A2B3E] font-sans overflow-x-hidden relative">
      <audio ref={audioRef} src="/musik.mp3" loop />

      <AnimatePresence mode="wait">
        {view === 'start' && (
          <StartScreen key="start" onStart={handleStart} />
        )}

        {view === 'gallery' && (
          <GalleryGrid 
            key="gallery" 
            onBack={handleBack} 
            selectedItem={selectedItem} 
            setSelectedItem={setSelectedItem} 
          />
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
            className="fixed inset-0 z-[999] bg-[#0A2B3E] origin-top pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === 'gallery' && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.8 } }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9, y: 0, boxShadow: "0px 0px 0px #0A2B3E" }}
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#FFD93D] border-4 border-[#0A2B3E] shadow-[4px_4px_0px_#0A2B3E] hover:bg-[#6BCB77] transition-colors text-2xl md:text-3xl cursor-pointer"
            title={isPlaying ? "Matikan Musik" : "Putar Musik"}
          >
            {isPlaying ? '🔊' : '🔇'}
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}