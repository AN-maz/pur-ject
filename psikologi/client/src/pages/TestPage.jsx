import { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, ChevronRight, ArrowRight, Keyboard, CheckCircle2 } from 'lucide-react';
import { getTestById } from '../utils/mdParser';

export default function TestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [testData] = useState(() => getTestById(testId));
  const [mode, setMode] = useState('intro'); // 'intro' | 'quiz'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [focusIndex, setFocusIndex] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const quizRef = useRef(null);

  const { metadata = {}, questions = [], instructionsContent = '' } = testData || {};
  const total = questions.length;

  if (!testData) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-muted">Tes tidak ditemukan.</p>
        <Link to="/menu" className="inline-block text-primary font-semibold hover:underline">
          Kembali ke Menu
        </Link>
      </div>
    );
  }

  const question = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;
  const options = question.options || metadata.options || [];
  const currentAnswered = answers[question.number] !== undefined;
  const isLast = currentIndex === total - 1;

  const handleSelect = (score) => {
    setAnswers((prev) => ({ ...prev, [question.number]: score }));
  };

  const goNext = () => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  const handleFinish = () => {
    if (!allAnswered) return;
    navigate(`/result/${testId}`, { state: { metadata, answers, answerScale: testData.answerScale } });
  };

  // Keyboard: 1-9 pilih opsi, ↑/↓ gerak, Enter pilih/lanjut, ←/→ navigasi
  const advance = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      setFocusIndex(0);
    } else {
      setConfirmOpen(true);
    }
  };

  const goPrev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
    setFocusIndex(0);
  };

  const handleKeyDown = (e) => {
    if (confirmOpen || !question) return;
    const opts = options;

    if (e.key >= '1' && e.key <= '9') {
      const idx = Number(e.key) - 1;
      if (idx < opts.length) {
        e.preventDefault();
        setFocusIndex(idx);
        setAnswers((prev) => ({ ...prev, [question.number]: opts[idx].score }));
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusIndex((i) => Math.min(opts.length - 1, i + 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === 'ArrowRight') {
      if (currentAnswered) {
        e.preventDefault();
        advance();
      }
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      if (!currentAnswered && opts[focusIndex]) {
        e.preventDefault();
        setAnswers((prev) => ({ ...prev, [question.number]: opts[focusIndex].score }));
      } else if (currentAnswered) {
        e.preventDefault();
        advance();
      }
    }
  };

  const startQuiz = () => {
    setMode('quiz');
    requestAnimationFrame(() => quizRef.current?.focus());
  };

  const progress = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <header className="mb-5 sm:mb-6">
        <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary mb-3">
          <ChevronLeft size={16} /> Kembali ke Menu
        </Link>
        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-primary-light text-primary">
          {metadata.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-main mt-2">{metadata.title}</h1>
        <p className="text-muted mt-1 text-sm sm:text-base">{metadata.description}</p>
      </header>

      {mode === 'intro' ? (
        <div className="bg-card border border-line rounded-2xl shadow-sm p-5 sm:p-6 space-y-4 animate-fade-up">
          <div className="prose prose-slate max-w-none text-main text-sm sm:text-base">
            <ReactMarkdown>
              {instructionsContent || 'Pilih jawaban yang paling sesuai untuk setiap pernyataan.'}
            </ReactMarkdown>
          </div>
          <button
            onClick={startQuiz}
            className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            Mulai Mengerjakan
          </button>
          <p className="hidden sm:flex items-center justify-center gap-1.5 text-xs text-muted">
            <Keyboard size={14} /> Tips: arahkan dengan ↑↓, pilih dengan Enter, lanjut dengan →.
          </p>
        </div>
      ) : (
        <div
          ref={quizRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="bg-card border border-line rounded-2xl shadow-sm p-5 sm:p-6 space-y-5 sm:space-y-6 outline-none quiz-scroll"
        >
          {/* Progres */}
          <div>
            <div className="flex justify-between text-xs sm:text-sm text-muted mb-2">
              <span>
                Soal {currentIndex + 1} dari {total}
              </span>
              <span className="tabular-nums">
                {answeredCount}/{total} terjawab
              </span>
            </div>
            <div className="h-2 bg-primary-light rounded-full overflow-hidden">
              <div
                className="h-2 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Pertanyaan (animasi ulang tiap ganti nomor) */}
          <div key={question.number} className="min-h-20 animate-fade-up">
            <h2 className="text-base sm:text-lg font-semibold text-main leading-relaxed">
              {question.text}
            </h2>
          </div>

          {/* Opsi Jawaban */}
          <div className="grid gap-2.5 sm:gap-3">
            {options.map((opt, i) => {
              const selected = answers[question.number] === opt.score;
              const focused = focusIndex === i;
              return (
                <button
                  key={`${question.number}-${i}`}
                  onClick={() => handleSelect(opt.score)}
                  onMouseEnter={() => setFocusIndex(i)}
                  className={`text-left px-4 py-3.5 sm:py-3 rounded-xl border transition-all duration-150 active:scale-[0.99] ${
                    selected
                      ? 'border-primary bg-primary-light text-primary font-semibold'
                      : focused
                        ? 'border-primary text-main'
                        : 'border-line text-main hover:border-primary'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`hidden sm:inline-flex w-6 h-6 items-center justify-center rounded-lg text-xs font-bold shrink-0 ${
                        selected ? 'bg-primary text-white' : 'bg-primary-light text-primary'
                      }`}
                    >
                      {i + 1}
                    </span>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigasi */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-line pt-4">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg border border-line text-main disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary transition-all"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            {!isLast ? (
              <button
                onClick={goNext}
                disabled={!currentAnswered}
                className="inline-flex items-center gap-1 px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-semibold rounded-lg bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-hover transition-all active:scale-[0.98]"
              >
                <span className="hidden sm:inline">Berikutnya</span> <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setConfirmOpen(true)}
                disabled={!allAnswered}
                className="inline-flex items-center gap-1 px-4 sm:px-5 py-2.5 sm:py-2 text-sm font-semibold rounded-lg bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-hover transition-all active:scale-[0.98]"
              >
                Lihat Hasil <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Konfirmasi selesai */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="bg-card border border-line rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4 animate-pop">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-primary-light text-primary">
                <CheckCircle2 size={22} />
              </span>
              <h3 className="text-lg font-bold text-main">Selesaikan Tes?</h3>
            </div>
            <p className="text-sm text-muted">
              {allAnswered
                ? `Semua ${total} soal sudah terjawab. Anda bisa melihat hasil sekarang.`
                : `Masih ada ${total - answeredCount} soal belum terjawab.`}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-line text-main hover:border-primary transition-all"
              >
                Cek Lagi
              </button>
              <button
                onClick={() => {
                  setConfirmOpen(false);
                  handleFinish();
                }}
                disabled={!allAnswered}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-primary text-white disabled:opacity-40 hover:bg-primary-hover transition-all"
              >
                Lihat Hasil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}