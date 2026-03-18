import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import galleryData from '../data/gallery.json';

export default function GalleryGrid({ onBack }) {
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      const scrollInterval = setInterval(() => {
        window.scrollBy({ top: 1, left: 0 });
      }, 0.05);
      
      window.autoScrollInterval = scrollInterval;
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(window.autoScrollInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }}
      exit={{ opacity: 0, y: 100, transition: { duration: 0.5 } }}
      className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
        {galleryData.map((item, index) => {
          let gridClass = "md:col-span-2 md:row-span-1";
          if (index % 3 === 0) gridClass = "md:col-span-2 md:row-span-2";
          else if (index % 3 === 1) gridClass = "md:col-span-2 md:row-span-1";
          else if (index % 3 === 2) gridClass = "md:col-span-4 md:row-span-1";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-3xl group ${gridClass} border-2 border-oxigen-light/30 shadow-2xl`}
            >
              <img 
                src={item.image} 
                alt={item.description || item.tag}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001A57] via-[#001A57]/50 to-transparent opacity-90"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {item.tag}
                </h2>
                {item.description && (
                  <p className="text-oxigen-light font-medium text-sm md:text-base line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="h-[60vh] flex flex-col items-center justify-center gap-10">
        <h3 className="text-oxigen-light text-2xl font-mono tracking-widest opacity-50">END OF GALLERY</h3>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="px-8 py-3 bg-transparent border-2 border-oxigen-light text-oxigen-light font-bold rounded-full hover:bg-oxigen-light hover:text-white transition-colors"
        >
          KEMBALI KE AWAL
        </motion.button>
      </div>
    </motion.div>
  );
}