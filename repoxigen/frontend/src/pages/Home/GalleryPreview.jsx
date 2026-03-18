import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import galleryData from '../../data/gallery.json'; 
import GalleryCard from '../../components/Cards/GalleryCard'; 

const GalleryPreview = () => {
  const latestGallery = galleryData.slice(0, 3);

  return (
    <section id="GalleryPreview" className="py-24 bg-oxigen-dark relative overflow-hidden">
  
      <div className="absolute top-0 right-0 w-96 h-96 bg-oxigen-light/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-software-teal/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-software-bright font-bold tracking-wide uppercase text-sm mb-2">
              Our Activities
            </h2>
            <h3 className="text-4xl font-extrabold text-white">
              Captured <span className="text-oxigen-light">Moments</span>
            </h3>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Intip keseruan kegiatan kami, mulai dari workshop teknis, kompetisi, hingga gathering seru antar anggota.
            </p>
          </div>

          <Link 
            to="/home/gallery#galleryDetail" 
            className="group flex items-center gap-2 text-white font-semibold border-b border-white/20 pb-1 hover:border-software-bright hover:text-software-bright transition-all duration-300"
          >
            Lihat Semua Galeri
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestGallery.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default GalleryPreview;