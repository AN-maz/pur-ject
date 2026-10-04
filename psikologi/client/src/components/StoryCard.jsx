import { forwardRef } from 'react';
import { STYLES } from './storyStyles';

// Kartu story rasio 9:16. Saat preview ~320-360px, diekspor ~1080x1920.
const StoryCard = forwardRef(function StoryCard({ metadata, result, styleIndex }, ref) {
  const s = STYLES[styleIndex] || STYLES[0];

  const title =
    result.type === 'score'
      ? { value: String(result.total), label: result.label, extra: `${result.total} poin` }
      : result.type === 'personality'
        ? { value: result.typeCode, label: 'Tipe Kepribadian', extra: result.typeCode }
        : result.dominant
          ? { value: result.dominant.label, label: 'Tipe Dominan', extra: result.dominant.label }
          : { value: '—', label: 'Hasil', extra: '' };

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[360px] aspect-[9/16] select-none rounded-[24px] overflow-hidden shadow-2xl"
      style={{ background: s.bg, color: s.text }}
    >
      {/* pola dekoratif */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-30"
        style={{ background: 'rgba(255,255,255,0.15)' }}
      />
      <div
        className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full opacity-20"
        style={{ background: s.soft }}
      />

      <div className="relative h-full flex flex-col p-7">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase opacity-90">
            <span className="w-2 h-2 rounded-full bg-white" style={{ background: s.text }} />
            PsychometricApp
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: s.soft }}
          >
            {metadata.category}
          </span>
        </div>

        {/* Konten tengah */}
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-2">
          <p className="text-[13px] opacity-90 max-w-[80%] leading-snug">{metadata.title}</p>
          <p className="text-[11px] uppercase tracking-widest opacity-75">{title.label}</p>

          <div
            className="w-full rounded-2xl px-4 py-6 flex flex-col items-center gap-1"
            style={{ background: s.surface }}
          >
            <p
              className="font-extrabold leading-none tracking-widest"
              style={{ fontSize: title.value.length > 6 ? '42px' : '76px' }}
            >
              {title.value}
            </p>
            <p className="text-[13px] font-semibold opacity-90 max-w-[90%] truncate">{title.extra}</p>
          </div>

          {/* Ringkasan singkat depan */}
          <p className="text-[12px] leading-relaxed opacity-90 line-clamp-3">
            {result.type === 'dimensions'
              ? result.dominant?.description
              : result.interpretation.split('\n\n')[0]}
          </p>
        </div>

        {/* Footer */}
        <div className="space-y-2">
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: s.soft }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${result.type === 'dimensions' ? result.dominant?.percent || 0 : 100}%`,
                background: s.text,
              }}
            />
          </div>
          <p className="text-[9px] leading-tight opacity-70">
            Hasil bersifat edukasi, bukan diagnosis medis. *Hasilmu • jangan jadi bahan diagnosa diri*
          </p>
        </div>
      </div>
    </div>
  );
});

export default StoryCard;