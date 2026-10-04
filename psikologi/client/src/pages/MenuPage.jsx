import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTests } from '../utils/mdParser';
import { ArrowRight } from 'lucide-react';

export default function MenuPage() {
  const tests = getAllTests();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Kesehatan Mental', 'Tipe Kepribadian'];

  const filteredTests = activeCategory === 'Semua'
    ? tests
    : tests.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-theme-main">Daftar Tes Psikologi</h1>
        <p className="text-theme-muted mt-1">Pilih modul tes yang ingin Anda kerjakan hari ini.</p>
      </div>

      {/* Filter Kategori */}
      <div className="flex gap-2 border-b border-theme pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeCategory === cat
                ? 'bg-theme-primary text-white shadow'
                : 'bg-card text-theme-muted border border-theme hover:text-theme-main'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Card Tes */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="p-6 bg-card rounded-2xl border border-theme shadow-sm flex flex-col justify-between space-y-4 hover:border-theme-primary transition-all"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-theme-light text-theme-primary">
                {test.category}
              </span>
              <h2 className="text-xl font-bold text-theme-main">{test.title}</h2>
              <p className="text-sm text-theme-muted">{test.description}</p>
            </div>

            <Link
              to={`/test/${test.id}`}
              className="inline-flex items-center justify-between w-full pt-4 border-t border-theme text-sm font-semibold text-theme-primary hover:underline"
            >
              <span>Mulai Tes</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}