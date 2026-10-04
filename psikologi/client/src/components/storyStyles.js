// Preset gradien untuk kartu story. Nilai pakai var(--color-*) agar
// mengikuti tema aktif saat diekspor ke PNG.
export const STYLES = [
  // 0: gradien primary (gelap turun)
  {
    bg: 'linear-gradient(165deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 55%, #0f172a) 100%)',
    surface: 'color-mix(in srgb, var(--color-primary) 88%, black)',
    text: '#ffffff',
    soft: 'rgba(255,255,255,0.28)',
  },
  // 1: krem muda (card)
  {
    bg: 'linear-gradient(165deg, color-mix(in srgb, var(--color-app) 92%, var(--color-primary) 8%) 0%, var(--color-primary-light) 100%)',
    surface: 'var(--color-card)',
    text: 'var(--color-main)',
    soft: 'var(--color-primary-light)',
  },
  // 2: aksen (accent core)
  {
    bg: 'linear-gradient(165deg, var(--color-accent) 0%, color-mix(in srgb, var(--color-accent) 50%, #0f172a) 100%)',
    surface: 'color-mix(in srgb, var(--color-accent) 88%, black)',
    text: '#ffffff',
    soft: 'rgba(255,255,255,0.28)',
  },
];