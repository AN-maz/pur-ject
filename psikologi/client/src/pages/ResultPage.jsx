import { useLocation, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { RotateCcw, LayoutGrid, AlertTriangle } from 'lucide-react';

function computeScoredResult(metadata, answers) {
  const total = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const level = (metadata.scoring?.levels || []).find(
    (lv) => total >= lv.min && total <= lv.max,
  );
  return {
    type: 'score',
    total,
    label: level?.label || 'Hasil',
    interpretation: level?.interpretation || 'Interpretasi tidak tersedia untuk rentang skor ini.',
  };
}

function computePersonalityResult(metadata, answers) {
  const letters = [];
  const detail = [];

  for (const dim of metadata.dimensions || []) {
    const dimScore = (dim.questions || []).reduce(
      (sum, q) => sum + (answers[q] || 0),
      0,
    );
    const letter = dimScore >= 0 ? dim.high : dim.low;
    letters.push(letter);
    detail.push({
      key: dim.key,
      label: dim.label,
      letter,
    });
  }

  const type = letters.join('');
  return {
    type: 'personality',
    typeCode: type,
    labels: detail,
    interpretation: metadata.interpretation?.[type] || 'Interpretasi tipe belum tersedia.',
  };
}

function computeDimensionsResult(metadata, answers, scale) {
  const scaleMin = scale?.min ?? 0;
  const scaleMax = scale?.max && scale.max > scaleMin ? scale.max : 1;

  const scores = (metadata.dimensions || []).map((dim) => {
    const questions = dim.questions || [];
    const dimScore = questions.reduce((sum, q) => sum + (answers[q] || 0), 0);
    const minPossible = questions.length * scaleMin;
    const maxPossible = questions.length * scaleMax;
    const span = maxPossible - minPossible;
    const percent =
      span > 0 ? Math.round(((dimScore - minPossible) / span) * 100) : 0;
    const band = percent >= 70 ? 'Tinggi' : percent >= 40 ? 'Sedang' : 'Rendah';

    return {
      key: dim.key,
      label: dim.label,
      description: dim.description,
      score: dimScore,
      percent: Math.max(0, Math.min(100, percent)),
      band,
    };
  });

  let dominant = null;
  if (metadata.pickHighest && scores.length) {
    dominant = scores.reduce((a, b) => (a.score >= b.score ? a : b));
  }

  return { type: 'dimensions', scores, dominant };
}

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;
  if (!state || !state.metadata) {
    // Data hilang (mis. refresh halaman) — arahkan kembali ke menu.
    navigate('/menu', { replace: true });
    return null;
  }

  const { metadata, answers, answerScale } = state;
  const result =
    metadata.type === 'dimensions'
      ? computeDimensionsResult(metadata, answers, answerScale)
      : metadata.type === 'personality'
        ? computePersonalityResult(metadata, answers)
        : computeScoredResult(metadata, answers);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-theme-light text-theme-primary">
          {metadata.category}
        </span>
        <h1 className="text-3xl font-bold text-theme-main mt-2">{metadata.title}</h1>
        <p className="text-theme-muted mt-1">Hasil Tes Anda</p>
      </div>

      {/* Ringkasan */}
      <div className="bg-card border border-theme rounded-2xl shadow-sm p-6 mb-6 space-y-4">
        {result.type === 'score' && (
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-sm text-theme-muted">Skor Total</p>
              <p className="text-5xl font-extrabold text-theme-primary">{result.total}</p>
            </div>
            <div className="h-16 w-px bg-theme" />
            <div>
              <p className="text-sm text-theme-muted">Tingkat</p>
              <p className="text-xl font-bold text-theme-main">{result.label}</p>
            </div>
          </div>
        )}

        {result.type === 'personality' && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-theme-muted">Tipe Kepribadian Anda</p>
              <p className="text-5xl font-extrabold text-theme-primary">{result.typeCode}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
              {result.labels.map((d) => (
                <div key={d.key} className="px-3 py-2 rounded-lg bg-theme-light text-center">
                  <p className="text-xs text-theme-muted">{d.label}</p>
                  <p className="font-bold text-theme-primary">{d.letter}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {result.type === 'dimensions' && result.dominant && (
          <div className="text-center">
            <p className="text-sm text-theme-muted">Tipe Dominan Anda</p>
            <p className="text-4xl font-extrabold text-theme-primary">{result.dominant.label}</p>
            {result.dominant.description && (
              <p className="text-sm text-theme-muted mt-2 max-w-lg mx-auto">
                {result.dominant.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Interpretasi / Profil */}
      {(result.type === 'score' || result.type === 'personality') && (
        <div className="bg-card border border-theme rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-theme-main mb-3">
            {result.type === 'score' ? 'Interpretasi' : `Tentang ${result.typeCode}`}
          </h2>
          <div className="prose prose-teal max-w-none text-theme-main">
            <ReactMarkdown>{result.interpretation}</ReactMarkdown>
          </div>
        </div>
      )}

      {result.type === 'dimensions' && (
        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-bold text-theme-main">Profil Anda</h2>
          {result.scores.map((d) => (
            <div key={d.key} className="bg-card border border-theme rounded-2xl shadow-sm p-5 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-theme-main">{d.label}</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-theme-light text-theme-primary">
                  {d.band}
                </span>
              </div>
              <div className="h-2 bg-theme-light rounded-full">
                <div
                  className="h-2 bg-theme-primary rounded-full transition-all"
                  style={{ width: `${d.percent}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-theme-muted">
                <span>Skor {d.score}</span>
                <span>{d.percent}%</span>
              </div>
              {d.description && <p className="text-sm text-theme-muted">{d.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex gap-3 p-4 rounded-xl bg-theme-light text-theme-primary text-sm leading-relaxed mb-8">
        <AlertTriangle size={18} className="shrink-0 mt-0.5" />
        <p>
          Hasil ini bersifat indikatif untuk tujuan edukasi dan skrining mandiri,
          bukan diagnosis medis atau psikologis. Jika Anda mengalami keluhan yang
          mengganggu, konsultasikan dengan psikolog atau psikiater profesional.
        </p>
      </div>

      {/* Aksi */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border border-theme text-theme-main hover:border-theme-primary transition-all"
        >
          <RotateCcw size={16} /> Ulangi Tes
        </button>
        <Link
          to="/menu"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-theme-primary text-white hover:bg-theme-primary-hover shadow-md transition-all"
        >
          <LayoutGrid size={16} /> Kembali ke Menu
        </Link>
      </div>
    </div>
  );
}