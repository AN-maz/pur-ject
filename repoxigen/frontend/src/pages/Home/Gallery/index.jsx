import React, { useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

import galleryData from '../../../data/gallery.json';
import GalleryCard from '../../../components/Cards/GalleryCard';

const GalleryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Logic Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = galleryData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(galleryData.length / itemsPerPage);

  // Fungsi Ganti Halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const location = useLocation();

  useEffect(() => {
    
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);


  return (
    <div className="min-h-screen bg-oxigen-dark pt-32 pb-20 px-6 relative overflow-hidden" id='galleryDetail'>

      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-oxigen-light/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-software-teal/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Tombol Kembali ke Home */}
        <div className="mb-8">
          <Link
            to="/#GalleryPreview"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors gap-2 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-software-bright to-hardware-cyan">Gallery</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Arsip lengkap dokumentasi kegiatan UKM OXIGEN. Temukan inspirasi dari jejak langkah dan karya kami.
          </p>
        </div>

        {/* Gallery Grid (All Items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">

            {/* Tombol Previous */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-3 rounded-full border border-white/10 transition-all duration-300
                ${currentPage === 1
                  ? 'text-gray-600 cursor-not-allowed opacity-50'
                  : 'text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg'}`
              }
            >
              <ChevronLeft size={24} />
            </button>

            {/* Angka Halaman */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`w-10 h-10 rounded-full font-bold transition-all duration-300
                    ${currentPage === number
                      ? 'bg-oxigen-light text-white shadow-lg shadow-oxigen-light/30 scale-110'
                      : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'}`
                  }
                >
                  {number}
                </button>
              ))}
            </div>

            {/* Tombol Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-full border border-white/10 transition-all duration-300
                ${currentPage === totalPages
                  ? 'text-gray-600 cursor-not-allowed opacity-50'
                  : 'text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg'}`
              }
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default GalleryPage;