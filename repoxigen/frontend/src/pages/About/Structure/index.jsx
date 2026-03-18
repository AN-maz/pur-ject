import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowDown } from 'lucide-react';
import structureData from '../../../data/structure.json';
import CharacterCard from '../../../components/Cards/CharacterCard';

const Structure = () => {
  const { bph, divisions } = structureData;

  const topLeaders = bph.filter(m => m.id === 'ketua' || m.id === 'wakil');
  const officers = bph.filter(m => m.id !== 'ketua' && m.id !== 'wakil');

  return (

    <section id="structure" className="relative py-24 bg-oxigen-dark text-white overflow-hidden scroll-mt-20">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover bg-center bg-fixed opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-software-bright font-bold tracking-[0.3em] uppercase mb-2 animate-pulse">
            System Hierarchy
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase" style={{ textShadow: '0 0 20px rgba(0,81,210,0.6)' }}>
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxigen-light to-software-bright">Team</span>
          </h3>
        </div>

        {/* --- LEVEL 1: TOP LEADERS (Ketua & Wakil) --- */}
        <div className="flex flex-wrap justify-center gap-10 mb-12">
          {topLeaders.map((member) => (
            <div key={member.id} className="relative z-10">

              <CharacterCard member={member} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-12 opacity-30">
           <ArrowDown size={40} className="text-white animate-bounce" />
        </div>

        {/* --- LEVEL 2: OFFICERS (Sekretaris & Bendahara) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 justify-items-center">
          {officers.map((member) => (
            <CharacterCard key={member.id} member={member} />
          ))}
        </div>

        {/* DIVISION SELECTION */}
        <div className="border-t border-white/10 pt-16">
          <div className="text-center mb-10">
            <h4 className="text-3xl font-bold text-white mb-2">Operational Units</h4>
            <p className="text-gray-400">Pilih divis untuk melihat daftar anggota.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((div) => (
              <Link 
                key={div.id}
                to={`/about/squad/${div.id}`}
                className={`group relative bg-white/5 border-l-4 ${div.color} p-6 rounded-r-xl hover:bg-white/10 transition-all hover:translate-x-2`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-xl font-bold text-white group-hover:text-oxigen-light transition-colors">{div.name}</h5>
                    <p className="text-sm text-gray-400 mt-1">{div.desc}</p>
                  </div>
                  <Users size={24} className="text-gray-500 group-hover:text-white transition-colors" />
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 group-hover:text-software-bright uppercase tracking-wider">
                  <span>View Roster</span>
                  <div className="h-px w-8 bg-current"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Structure;