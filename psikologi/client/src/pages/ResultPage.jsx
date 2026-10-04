import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { toBlob, toPng } from 'html-to-image';
import { RotateCcw, LayoutGrid, AlertTriangle, Download, Copy, Palette } from 'lucide-react';
import StoryCard from '../components/StoryCard';
import { STYLES } from '../components/storyStyles';

// Animasi angka naik dari 0 ke target dengan easing.
function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === undefined) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

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
  const { testId } = useParams();
  const storyRef = useRef(null);
  const [styleIndex, setStyleIndex] = useState(0);
  const [busy, setBusy] = useState(null); // null | 'download' | 'copy'
  const [shareErr, setShareErr] = useState('');

  const state = location.state;
  const metadata = state?.metadata;
  const answers = state?.answers || {};
  const answerScale = state?.answerScale;
  const result = metadata
    ? metadata.type === 'dimensions'
      ? computeDimensionsResult(metadata, answers, answerScale)
      : metadata.type === 'personality'
        ? computePersonalityResult(metadata, answers)
        : computeScoredResult(metadata, answers)
    : null;

  const scoreTotal = useCountUp(result?.type === 'score' ? result.total : 0);

  // Data hilang (mis. refresh halaman) — arahkan kembali ke menu.
  useEffect(() => {
    if (!metadata) navigate('/menu', { replace: true });
  }, [metadata, navigate]);

  if (!metadata || !result) return null;

  // Rasio agar output selalu 1080x1920 (pas status IG)
  const exportRatio = () => {
    const el = storyRef.current;
    return el ? 1080 / el.offsetWidth : 3;
  };

  const handleDownload = async () => {
    setBusy('download');
    setShareErr('');
    try {
      const url = await toPng(storyRef.current, { pixelRatio: exportRatio(), cacheBust: true });
      const a = document.createElement('a');
      a.href = url;
      a.download = `hasil-${testId || 'psiko'}.png`;
      a.click();
    } catch {
      setShareErr('Gagal membuat gambar. Coba lagi.');
    } finally {
      setBusy(null);
    }
  };

  const handleCopy = async () => {
    setBusy('copy');
    setShareErr('');
    try {
      const blob = await toBlob(storyRef.current, { pixelRatio: exportRatio(), cacheBust: true });
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch {
      // Fallback: unduh langsung bila clipboard ditolak
      await handleDownload();
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="text-center mb-8 animate-fade-up">
        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-primary-light text-primary">
          {metadata.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-main mt-2">{metadata.title}</h1>
        <p className="text-muted mt-1 text-sm sm:text-base">Hasil Tes Anda</p>
      </div>

      {/* Ringkasan */}
      <div className="bg-card border border-line rounded-2xl shadow-sm p-6 mb-6 space-y-4 animate-pop">
        {result.type === 'score' && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-sm text-muted">Skor Total</p>
              <p className="text-5xl sm:text-6xl font-extrabold text-primary tabular-nums">{scoreTotal}</p>
            </div>
            <div className="h-px w-24 sm:h-16 sm:w-px bg-line" />
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted">Tingkat</p>
              <p className="text-xl font-bold text-main">{result.label}</p>
            </div>
          </div>
        )}

        {result.type === 'personality' && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted">Tipe Kepribadian Anda</p>
              <p className="text-5xl font-extrabold text-primary tracking-widest">
                {(result.typeCode || '').split('').map((ch, i) => (
                  <span
                    key={i}
                    className="inline-block animate-pop"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    {ch}
                  </span>
                ))}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {result.labels.map((d) => (
                <div key={d.key} className="px-3 py-2 rounded-lg bg-primary-light text-center animate-fade-up">
                  <p className="text-xs text-muted">{d.label}</p>
                  <p className="font-bold text-primary">{d.letter}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {result.type === 'dimensions' && result.dominant && (
          <div className="text-center">
            <p className="text-sm text-muted">Tipe Dominan Anda</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-primary animate-pop">{result.dominant.label}</p>
            {result.dominant.description && (
              <p className="text-sm text-muted mt-2 max-w-lg mx-auto leading-relaxed">
                {result.dominant.description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Interpretasi / Profil */}
      {(result.type === 'score' || result.type === 'personality') && (
        <div className="bg-card border border-line rounded-2xl shadow-sm p-5 sm:p-6 mb-6 animate-fade-up">
          <h2 className="text-lg font-bold text-main mb-3">
            {result.type === 'score' ? 'Interpretasi' : `Tentang ${result.typeCode}`}
          </h2>
          <div className="prose prose-teal max-w-none text-main text-sm sm:text-base">
            <ReactMarkdown>{result.interpretation}</ReactMarkdown>
          </div>
        </div>
      )}

      {result.type === 'dimensions' && (
        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-bold text-main">Profil Anda</h2>
          {result.scores.map((d, i) => (
            <div
              key={d.key}
              className="bg-card border border-line rounded-2xl shadow-sm p-5 space-y-2 animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-main">{d.label}</h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-light text-primary">
                  {d.band}
                </span>
              </div>
              <div className="h-2 bg-primary-light rounded-full">
                <div
                  className="h-2 bg-primary rounded-full transition-all"
                  style={{ width: `${d.percent}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>Skor {d.score}</span>
                <span>{d.percent}%</span>
              </div>
              {d.description && <p className="text-sm text-muted">{d.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Bagikan ke Story */}
      <section className="bg-card border border-line rounded-2xl shadow-sm p-5 sm:p-6 mb-6 animate-fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="p-2 rounded-full bg-primary-light text-primary">
            <Palette size={18} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-main">Bagikan ke Story</h2>
            <p className="text-xs text-muted">Kartu 9:16 — pas untuk status Instagram (1080×1920).</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Preview kartu */}
          <div className="w-full max-w-[300px] mx-auto sm:mx-0">
            <StoryCard ref={storyRef} metadata={metadata} result={result} styleIndex={styleIndex} />
          </div>

          {/* Kontrol */}
          <div className="flex-1 w-full space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted mb-2 uppercase tracking-wide">Gaya Tampilan</p>
              <div className="flex gap-2">
                {STYLES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStyleIndex(i)}
                    aria-label={`Gaya ${i + 1}`}
                    className={`w-8 h-8 rounded-full border-2 transition-all active:scale-90 ${
                      styleIndex === i ? 'border-primary scale-110' : 'border-line'
                    }`}
                    style={{ background: STYLES[i].bg }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleDownload}
                disabled={busy !== null}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-primary text-white disabled:opacity-50 hover:bg-primary-hover transition-all active:scale-[0.98]"
              >
                <Download size={16} />
                {busy === 'download' ? 'Membuat gambar…' : 'Unduh PNG'}
              </button>
              <button
                onClick={handleCopy}
                disabled={busy !== null}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border border-line text-main disabled:opacity-50 hover:border-primary transition-all active:scale-[0.98]"
              >
                <Copy size={16} />
                {busy === 'copy' ? 'Menyalin…' : 'Salin ke Clipboard'}
              </button>
            </div>

            {shareErr && <p className="text-xs text-accent">{shareErr}</p>}
            <p className="text-xs text-muted leading-relaxed">
              Tips: setelah diunduh, unggah langsung ke Story IG. Kartu menyesuaikan warna tema aktif.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="flex gap-3 p-4 rounded-xl bg-primary-light text-primary text-sm leading-relaxed mb-8">
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
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border border-line text-main hover:border-primary transition-all"
        >
          <RotateCcw size={16} /> Ulangi Tes
        </button>
        <Link
          to="/menu"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary-hover shadow-md transition-all"
        >
          <LayoutGrid size={16} /> Kembali ke Menu
        </Link>
      </div>
    </div>
  );
}