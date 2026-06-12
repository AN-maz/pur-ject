import React, { useState, useEffect, useRef } from 'react';
import { useMarkdown } from './hooks/useMarkdown';
import { SlideViewer } from './components/SlideViewer';
import { SlideControls } from './components/SlideControl';

export default function App() {
  // Arahkan ke file md yang disave di public/materi/
  const { slides, loading, error } = useMarkdown('/materi/materi1.md');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error("Gagal fullscreen:", err));
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Monitor perubahan fullscreen (misal user tekan tombol ESC bawaan OS)
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Kontrol Keyboard (Panah kanan/kiri/Spasi untuk slide, tombol F untuk Fullscreen)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, slides.length]);

  if (loading) return <div className="flex h-screen items-center justify-center font-mono text-software-bright bg-neutral-950">Memuat materi...</div>;
  if (error) return <div className="flex h-screen items-center justify-center font-mono text-red-500 bg-neutral-950">Gagal: {error}</div>;
  if (slides.length === 0) return <div className="flex h-screen items-center justify-center font-mono text-neutral-500 bg-neutral-950">Materi kosong.</div>;

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Area Tampilan Slide */}
      <div 
        ref={containerRef} 
        className="flex-1 flex items-center justify-center bg-neutral-900 p-4 relative"
      >
        {/* Kontainer Slide dengan Rasio Aspek 16:9 */}
        <div className="w-full max-w-5xl aspect-[16/9] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center transition-all duration-300">
          <SlideViewer markdownContent={slides[currentIndex]} />
        </div>
      </div>

      {/* Bar Kontrol Bawah */}
      <div className="p-6 bg-neutral-950 border-t border-neutral-900/60">
        <SlideControls 
          current={currentIndex} 
          total={slides.length} 
          onPrev={handlePrev} 
          onNext={handleNext} 
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>
    </div>
  );
}