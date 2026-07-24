import React, { useState, useEffect, useRef } from 'react'
import { useMarkdown } from './hooks/useMarkdown'
import { SlideViewer } from './components/SlideViewer'
import { SlideControls } from './components/SlideControls'
import { QuizOverlay } from './components/QuizOverlay'

export default function App() {
  const { slides, slideTypes, quizData, loading, error } = useMarkdown('/materi/materi1.md')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [isPrinting, setIsPrinting] = useState(false)
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 })
  const containerRef = useRef(null)

  const handleNext = () => {
    if (currentIndex < slides.length - 1) setCurrentIndex(prev => prev + 1)
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
  }

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Gagal fullscreen:', err))
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleExportPDF = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 150)
  }

  const handleQuizComplete = (correct, total) => {
    setQuizScore(prev => ({
      correct: prev.correct + correct,
      total: prev.total + total,
    }))
    handleNext()
  }

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (slideTypes[currentIndex] === 'quiz') return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, slides.length, slideTypes])

  if (loading) return <div className="flex h-screen items-center justify-center font-mono text-software-bright bg-neutral-950">Memuat materi...</div>
  if (error) return <div className="flex h-screen items-center justify-center font-mono text-red-500 bg-neutral-950">Gagal: {error}</div>
  if (slides.length === 0) return <div className="flex h-screen items-center justify-center font-mono text-neutral-500 bg-neutral-950">Materi kosong.</div>

  const isQuiz = slideTypes[currentIndex] === 'quiz'

  return (
    <>
      <div className={`flex flex-col h-screen overflow-hidden relative print:hidden ${
        darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-900'
      }`}>

        <div
          ref={containerRef}
          className={`w-full h-full flex flex-col items-center justify-center p-6 relative transition-colors duration-300 ${
            darkMode ? 'bg-neutral-950' : 'bg-neutral-100'
          } ${isFullscreen ? 'p-10' : 'pt-16'}`}
        >
          <div className={`absolute top-4 right-6 flex items-center gap-3 z-50 px-4 py-2 rounded-xl border shadow-md select-none pointer-events-none transition-all duration-300 ${
            darkMode ? 'bg-neutral-900/80 border-neutral-800 shadow-black/40' : 'bg-white/90 border-neutral-200 shadow-neutral-200/40'
          }`}>
            <img src="/logo/oxigen.png" alt="Oxigen" className="h-6 w-auto max-w-[100px] object-contain block" onError={(e) => e.target.style.display='none'} />
            <div className={`h-4 w-[1px] ${darkMode ? 'bg-neutral-700' : 'bg-neutral-300'}`} />
            <img src="/logo/software.png" alt="Software" className="h-6 w-auto max-w-[100px] object-contain block" onError={(e) => e.target.style.display='none'} />
          </div>

          {isFullscreen && (
            <div className={`absolute bottom-4 left-6 z-50 px-4 py-2 rounded-xl border shadow-md select-none pointer-events-none transition-all duration-300 font-mono text-xs font-extrabold tracking-wider ${
              darkMode
                ? 'bg-neutral-900/80 border-neutral-800 text-software-bright shadow-black/40'
                : 'bg-white/90 border-neutral-200 text-software-teal shadow-neutral-200/40'
            }`}>
              SLIDE {(currentIndex + 1).toString().padStart(2, '0')} / {slides.length.toString().padStart(2, '0')}
            </div>
          )}

          <div className={`w-full border rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center transition-all duration-300 ${
            isFullscreen ? 'max-w-7xl h-full max-h-[88vh]' : 'max-w-5xl aspect-[16/9]'
          } ${
            darkMode ? 'bg-neutral-900 border-neutral-800 shadow-black/50' : 'bg-white border-neutral-200 shadow-neutral-300/50'
          }`}>
            {isQuiz ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className={`text-center p-12 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-lg font-medium">Quiz tersedia untuk slide ini</p>
                  <p className="text-sm mt-2">Klik tombol mulai di bawah</p>
                </div>
              </div>
            ) : (
              <SlideViewer markdownContent={slides[currentIndex]} darkMode={darkMode} />
            )}
          </div>
        </div>

        <div className={`p-6 border-t z-10 transition-colors duration-300 ${
          darkMode ? 'bg-neutral-950 border-neutral-900/50' : 'bg-neutral-100 border-neutral-200'
        }`}>
          <SlideControls
            current={currentIndex}
            total={slides.length}
            onPrev={handlePrev}
            onNext={handleNext}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            onExportPDF={handleExportPDF}
            quizScore={quizScore}
            isQuiz={isQuiz}
          />
        </div>
      </div>

      {isQuiz && quizData[currentIndex] && (
        <QuizOverlay
          key={currentIndex}
          quizData={quizData[currentIndex]}
          onComplete={handleQuizComplete}
          darkMode={darkMode}
        />
      )}

      {isPrinting && (
        <div className="hidden print:block bg-white text-neutral-900 w-full h-auto">
          {slides.map((slide, index) => (
            slideTypes[index] === 'content' && (
              <div
                key={index}
                className="w-full p-12 bg-white"
                style={{ breakAfter: 'page', pageBreakAfter: 'always' }}
              >
                <SlideViewer markdownContent={slide} darkMode={false} isPrint={true} />
              </div>
            )
          ))}
        </div>
      )}
    </>
  )
}