import React, { useState, useCallback, useEffect } from 'react'
import Confetti from './Confetti'

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export function QuizOverlay({ quizData, onComplete, darkMode }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const { title, questions } = quizData
  const question = questions[currentQ]

  useEffect(() => {
    setCurrentQ(0)
    setSelected(null)
    setShowResult(false)
    setAnswers([])
    setFinished(false)
    setShowConfetti(false)
  }, [quizData])

  const handleSelect = useCallback((index) => {
    if (selected !== null) return
    setSelected(index)
    setShowResult(true)

    const correct = index === question.correctIndex
    setAnswers(prev => [...prev, correct])

    if (correct) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2200)
    }
  }, [selected, question])

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1)
      setSelected(null)
      setShowResult(false)
    } else {
      setFinished(true)
    }
  }, [currentQ, questions.length])

  const handleFinish = useCallback(() => {
    onComplete(answers.filter(Boolean).length, answers.length)
  }, [answers, onComplete])

  if (!question) return null

  if (finished) {
    const correct = answers.filter(Boolean).length
    const total = answers.length
    const percentage = Math.round((correct / total) * 100)
    const passed = percentage >= 70

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <Confetti active={showConfetti} />
        <div className={`rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl border ${
          darkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-200'
        }`}>
          <div className={`text-5xl mb-4 ${passed ? '' : ''}`}>
            {passed ? '🎉' : '💪'}
          </div>
          <h3 className={`text-2xl font-extrabold mb-1 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Quiz Selesai!
          </h3>
          <p className={`text-base mb-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {title}
          </p>
          <p className={`text-lg font-bold mb-6 ${passed ? 'text-software-bright' : 'text-amber-400'}`}>
            {correct} / {total} ({percentage}%)
          </p>
          <div className="w-full bg-neutral-800 rounded-full h-3 mb-6 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                passed ? 'bg-software-bright' : 'bg-amber-400'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className={`text-sm mb-6 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            {passed
              ? 'Luar biasa! Lanjutkan ke materi berikutnya.'
              : 'Semangat! Pelajari lagi materi di atas.'}
          </p>
          <button
            onClick={handleFinish}
            className={`px-8 py-3 rounded-xl font-bold transition cursor-pointer ${
              darkMode
                ? 'bg-software-bright text-neutral-950 hover:bg-software-bright/90'
                : 'bg-software-teal text-white hover:bg-software-teal/90'
            }`}
          >
            Lanjut ke Materi →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <Confetti active={showConfetti} />
      <div className={`rounded-3xl p-8 max-w-2xl w-full shadow-2xl border overflow-y-auto max-h-[90vh] ${
        darkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-widest ${
              darkMode ? 'text-software-tosca' : 'text-software-teal'
            }`}>
              Quiz
            </span>
            <h3 className={`text-xl font-bold mt-0.5 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              {title}
            </h3>
          </div>
          <span className={`text-sm font-mono px-3 py-1 rounded-lg border shrink-0 ${
            darkMode
              ? 'bg-neutral-800 border-neutral-700 text-neutral-400'
              : 'bg-neutral-100 border-neutral-200 text-neutral-500'
          }`}>
            {currentQ + 1}/{questions.length}
          </span>
        </div>

        <div className="mb-6">
          <p className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {question.question}
          </p>
          <div className="flex flex-col gap-3">
            {question.options.map((option, i) => {
              let btnStyle = darkMode
                ? 'bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700'
                : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'

              if (showResult) {
                if (i === question.correctIndex) {
                  btnStyle = 'border-software-bright bg-software-bright/10 text-software-bright ring-2 ring-software-bright'
                } else if (i === selected && i !== question.correctIndex) {
                  btnStyle = 'border-red-500 bg-red-500/10 text-red-400 ring-2 ring-red-500'
                } else {
                  btnStyle = darkMode
                    ? 'bg-neutral-800/50 border-neutral-700/50 text-neutral-500'
                    : 'bg-neutral-50/50 border-neutral-200/50 text-neutral-400'
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                    !showResult && 'hover:scale-[1.02] hover:shadow-md'
                  } ${btnStyle}`}
                >
                  <span className={`font-mono font-bold text-sm w-8 h-8 flex items-center justify-center rounded-lg shrink-0 ${
                    showResult && i === question.correctIndex
                      ? 'bg-software-bright text-neutral-950'
                      : showResult && i === selected && i !== question.correctIndex
                        ? 'bg-red-500 text-white'
                        : darkMode
                          ? 'bg-neutral-700 text-neutral-300'
                          : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {OPTION_LABELS[i]}
                  </span>
                  <span className="text-sm md:text-base leading-snug flex-1">{option}</span>
                  {showResult && i === question.correctIndex && (
                    <span className="text-software-bright shrink-0 font-bold">✓</span>
                  )}
                  {showResult && i === selected && i !== question.correctIndex && (
                    <span className="text-red-400 shrink-0 font-bold">✗</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {showResult && (
          <div className={`mb-6 p-4 rounded-xl border text-sm leading-relaxed ${
            selected === question.correctIndex
              ? darkMode
                ? 'bg-software-bright/5 border-software-bright/30 text-software-bright'
                : 'bg-green-50 border-green-200 text-green-700'
              : darkMode
                ? 'bg-red-500/5 border-red-500/30 text-red-400'
                : 'bg-red-50 border-red-200 text-red-600'
          }`}>
            {selected === question.correctIndex
              ? '✅ Jawaban tepat!'
              : `❌ Jawaban yang benar adalah ${OPTION_LABELS[question.correctIndex]}. Pelajari kembali materi di atas.`}
          </div>
        )}

        {showResult && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className={`px-6 py-2.5 rounded-xl font-bold transition cursor-pointer text-sm ${
                darkMode
                  ? 'bg-software-bright text-neutral-950 hover:bg-software-bright/90'
                  : 'bg-software-teal text-white hover:bg-software-teal/90'
              }`}
            >
              {currentQ < questions.length - 1 ? 'Pertanyaan Selanjutnya →' : 'Lihat Hasil →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}