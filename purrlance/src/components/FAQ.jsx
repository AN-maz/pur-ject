import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const faqs = [
  {
    q: 'Berapa lama proses pembuatan websitenya?',
    a: 'Rata-rata 5–7 hari kerja setelah data produk dan aset desain (logo, foto) diterima dari kamu. Untuk paket Growth, bisa 10–14 hari kerja.',
  },
  {
    q: 'Apakah saya perlu mengerti IT atau coding?',
    a: 'Sama sekali tidak perlu! Kamu cukup menyiapkan foto produk dan info bisnis. Sisanya kami yang urus, dari desain hingga website live.',
  },
  {
    q: 'Bagaimana cara update menu atau produk ke depannya?',
    a: 'Kamu bisa kirimkan perubahan via WhatsApp ke tim kami. Untuk update kecil (ganti harga, tambah/hapus produk), kami bantu gratis untuk 30 hari pertama setelah launch.',
  },
  {
    q: 'Apakah website bisa dibuka di HP pelanggan saya?',
    a: 'Tentu! Semua website yang kami buat sudah dioptimasi penuh untuk tampilan mobile (smartphone). Ini justru prioritas utama kami.',
  },
  {
    q: 'Bagaimana dengan biaya setelah tahun pertama?',
    a: 'Biaya hosting dan domain biasanya sekitar Rp 300.000–600.000 per tahun. Kami akan mengingatkan kamu 1 bulan sebelum jatuh tempo agar tidak ada yang terlewat.',
  },
  {
    q: 'Apakah pesanan pelanggan benar-benar langsung masuk ke WA saya?',
    a: 'Ya, persis. Ketika pelanggan klik "Pesan Sekarang", sistem akan membuka WhatsApp dengan ringkasan pesanan yang sudah terformat otomatis — nama produk, jumlah, dan total harga. Kamu tinggal konfirmasi dan proses.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref, isVisible } = useScrollAnimation();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding" id="faq" ref={ref}>
      <div className="container">
        <div className={`fade-up ${isVisible ? 'visible' : ''}`}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Pertanyaan yang Sering Ditanya</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item fade-up ${isVisible ? 'visible' : ''} ${openIndex === i ? 'open' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                id={`faq-question-${i}`}
              >
                <span>{faq.q}</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="faq-answer-wrapper">
                <div className="faq-answer">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
