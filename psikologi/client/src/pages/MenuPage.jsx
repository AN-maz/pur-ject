import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTests } from '../utils/mdParser';
import { ArrowRight } from 'lucide-react';

export default function MenuPage() {
  const tests = getAllTests();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Kesehatan Mental', 'Tipe Kepribadian'];
  const filteredTests =
    activeCategory === 'Semua'
      ? tests
      : tests.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="animate-fade-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-main">Daftar Tes Psikologi</h1>
        <p className="text-muted mt-1 text-sm sm:text-base">
          Pilih modul tes yang ingin Anda kerjakan hari ini.
        </p>
      </div>

      {/* Filter Kategori — horizontal scroll di mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:border-b sm:border-line sm:pb-4">
        {categories.map((cat) => {
          const count = cat === 'Semua' ? tests.length : tests.filter((t) => t.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-all active:scale-95 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow'
                  : 'bg-card text-muted border border-line hover:text-main'
              }`}
            >
              {cat} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid Card Tes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredTests.map((test, i) => (
          <div
            key={test.id}
            className="p-5 sm:p-6 bg-card rounded-2xl border border-line shadow-sm flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-md animate-fade-up"
            style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-primary-light text-primary">
                {test.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-main leading-snug">{test.title}</h2>
              <p className="text-sm text-muted leading-relaxed line-clamp-3">{test.description}</p>
            </div>

            <Link
              to={`/test/${test.id}`}
              className="inline-flex items-center justify-between w-full pt-4 border-t border-line text-sm font-semibold text-primary hover:underline group"
            >
              <span>Mulai Tes</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}