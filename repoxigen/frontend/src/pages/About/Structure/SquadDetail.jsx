import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import structureData from '../../../data/structure.json';
import CharacterCard from '../../../components/Cards/CharacterCard';

const SquadDetail = () => {
  const { divisionId } = useParams();

  const division = structureData.divisions.find(d => d.id === divisionId);

  if (!division) {
    return <div className="min-h-screen bg-oxigen-dark flex items-center justify-center text-white">Divisi tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-oxigen-dark pt-32 pb-20 px-6">

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-oxigen-light/30 via-oxigen-dark to-black"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Back Button */}
        <Link to="/about#structure" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Struktur
        </Link>

        {/* Header Squad */}
        <div className="text-center mb-16">
          <span className={`inline-block px-3 py-1 mb-4 rounded border text-xs font-bold uppercase tracking-widest ${division.color.replace('border-', 'text-').replace('border-', 'border-')}`}>
            Operational Unit
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase mb-4">
            {division.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Squad</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {division.desc}
          </p>
        </div>

        {/* Member Grid */}
        {division.members && division.members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {division.members.map((member) => (
              <CharacterCard key={member.id} member={{ ...member, color: division.isTech ? 'from-oxigen-light to-cyan-500' : 'from-gray-600 to-gray-800' }} />
            ))}
          </div>
        ) : (

          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
            <p className="text-gray-500 text-xl">Belum ada data anggota untuk squad ini.</p>
            <p className="text-sm text-gray-600 mt-2">Data sedang diupdate oleh administrator.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SquadDetail;