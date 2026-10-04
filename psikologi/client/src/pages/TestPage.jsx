import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getTestById } from '../utils/mdParser';

export default function TestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [testData] = useState(() => getTestById(testId));
  const [mode, setMode] = useState('intro'); // 'intro' | 'quiz'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!testData) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-theme-muted">Tes tidak ditemukan.</p>
        <Link to="/menu" className="inline-block text-theme-primary font-semibold hover:underline">
          Kembali ke Menu
        </Link>
      </div>
    );
  }

  const { metadata, questions, instructionsContent } = testData;
  const question = questions[currentIndex];
  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;
  const options = question.options || metadata.options || [];

  const handleSelect = (score) => {
    setAnswers({ ...answers, [question.number]: score });
  };

  const handleNext = () => {
    if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = () => {
    navigate(`/result/${testId}`, { state: { metadata, answers, answerScale: testData.answerScale } });
  };

  const progress = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-6">
        <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-theme-muted hover:text-theme-primary mb-3">
          <ChevronLeft size={16} /> Kembali ke Menu
        </Link>
        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-theme-light text-theme-primary">
          {metadata.category}
        </span>
        <h1 className="text-3xl font-bold text-theme-main mt-2">{metadata.title}</h1>
        <p className="text-theme-muted mt-1">{metadata.description}</p>
      </header>

      {mode === 'intro' ? (
        <div className="bg-card border border-theme rounded-2xl shadow-sm p-6 space-y-4">
          <div className="prose prose-teal max-w-none text-theme-main">
            <ReactMarkdown>
              {instructionsContent || 'Pilih jawaban yang paling sesuai untuk setiap pernyataan.'}
            </ReactMarkdown>
          </div>
          <button
            onClick={() => setMode('quiz')}
            className="w-full py-3 bg-theme-primary bg-theme-primary-hover text-white font-semibold rounded-xl shadow-md transition-all"
          >
            Mulai Mengerjakan
          </button>
        </div>
      ) : (
        <div className="bg-card border border-theme rounded-2xl shadow-sm p-6 space-y-6">
          {/* Progres */}
          <div>
            <div className="flex justify-between text-sm text-theme-muted mb-2">
              <span>
                Soal {currentIndex + 1} dari {total}
              </span>
              <span>{answeredCount}/{total} terjawab</span>
            </div>
            <div className="h-2 bg-theme-light rounded-full">
              <div
                className="h-2 bg-theme-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Pertanyaan */}
          <div className="min-h-24">
            <h2 className="text-lg font-semibold text-theme-main">{question.text}</h2>
          </div>

          {/* Opsi Jawaban */}
          <div className="grid gap-3">
            {options.map((opt, i) => {
              const selected = answers[question.number] === opt.score;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(opt.score)}
                  className={`text-left px-4 py-3 rounded-xl border transition-all ${
                    selected
                      ? 'border-theme-primary bg-theme-light text-theme-primary font-semibold'
                      : 'border-theme text-theme-main hover:border-theme-primary'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Navigasi */}
          <div className="flex items-center justify-between pt-2 border-t border-theme pt-4">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border border-theme text-theme-main disabled:opacity-40 disabled:cursor-not-allowed hover:border-theme-primary transition-all"
            >
              <ChevronLeft size={16} /> Sebelumnya
            </button>

            {currentIndex < total - 1 ? (
              <button
                onClick={handleNext}
                disabled={answers[question.number] === undefined}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg bg-theme-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-theme-primary-hover transition-all"
              >
                Berikutnya <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!allAnswered}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg bg-theme-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-theme-primary-hover transition-all"
              >
                Lihat Hasil <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}