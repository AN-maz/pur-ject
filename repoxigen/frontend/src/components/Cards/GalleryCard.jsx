import React from 'react';
import { Calendar, Tag } from 'lucide-react';

const GalleryCard = ({ item }) => {
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-oxigen-light/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-oxigen-light/20 flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-oxigen-dark/80 backdrop-blur text-xs font-bold text-software-bright px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
          <Tag size={12} />
          {item.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Date */}
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <Calendar size={14} />
          <span>{formatDate(item.date)}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-oxigen-light transition-colors">
          {item.title}
        </h3>

        {/* Desc */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {item.desc}
        </p>
      </div>
    </div>
  );
};

export default GalleryCard;