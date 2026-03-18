import React from 'react';

const CharacterCard = ({ member }) => {
  return (
    <div className="group relative w-72 md:w-80 perspective-1000 mx-auto">
      
      {/* Card Container */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:border-white/30">
        
        {/* Image Area */}
        <div className="h-64 overflow-hidden relative">
          <div className={`absolute inset-0 bg-gradient-to-b ${member.color || 'from-gray-700 to-gray-900'} opacity-30 mix-blend-overlay z-10 group-hover:opacity-10 transition-opacity duration-500`}></div>
          
          <img 
            src={member.image || 'https://via.placeholder.com/400x500?text=No+Image'} 
            alt={member.name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
          />
          
          {/* Role Badge */}
          <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur border border-white/20 px-3 py-1 rounded text-xs font-bold text-white uppercase tracking-wider shadow-lg">
             {member.role}
          </div>
        </div>

        {/* Stats Area */}
        <div className="p-6">
          <h4 className="text-xl font-bold text-white mb-1 group-hover:text-oxigen-light transition-colors truncate">
            {member.name}
          </h4>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">
            {member.nickname || 'Member'}
          </p>

          {/* RPG Stats Bars Dinamis */}
          <div className="space-y-3">
            {member.stats && Object.entries(member.stats).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                <span className="w-16 text-gray-400 font-mono capitalize truncate">{key}</span>
                <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${value > 85 ? 'bg-oxigen-light' : 'bg-gray-500'} group-hover:bg-gradient-to-r group-hover:${member.color || 'from-oxigen-light to-blue-400'}`} 
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
                <span className="text-white font-bold w-6 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Bottom Bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${member.color || 'from-gray-700 to-gray-500'}`}></div>
      </div>
    </div>
  );
};

export default CharacterCard;