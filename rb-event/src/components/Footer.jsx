import React from 'react';
// Import logo Ruang Belajar dari folder assets
import logoImage from '../assets/logo-ruang-belajar.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-5 border-t-4 border-brand-green">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        
        {/* Info Brand & Logo */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            {/* Logo diberi filter brightness-0 invert agar menjadi warna putih polos di background gelap */}
            <img src={logoImage} alt="Logo Ruang Belajar" className="w-12 h-12" />
            <h2 className="text-2xl font-bold text-white">Ruang Belajar</h2>
          </div>
          <p className="text-sm text-gray-400 text-center md:text-left max-w-xs leading-relaxed">
            Komunitas tempat kita saling berbagi ilmu, belajar bersama, dan tumbuh bersama.
          </p>
        </div>

        {/* Link Kontak & Sosial Media */}
        <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
          <h3 className="text-white font-semibold text-lg tracking-wide">Terhubung Bersama Kami</h3>
          
          {/* Kumpulan Tombol Link */}
          <div className="flex flex-col gap-3 w-full sm:w-80 md:w-64">
            
            {/* Link Website Komunitas */}
            <a 
              href="https://ruangbelajar.digital/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 bg-gray-800 py-3 px-5 rounded-2xl border border-gray-700 hover:border-brand-green hover:bg-gray-700/50 transition-all group w-full"
            >
              {/* Ikon Globe/Website SVG */}
              <svg className="w-6 h-6 text-gray-400 group-hover:text-brand-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">Website ruang belajar</span>
            </a>

            {/* Link Instagram */}
            <a 
              href="https://www.instagram.com/ruangbelajar.it?igsh=MTN4aWFpOXVxNWJiZQ==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 bg-gray-800 py-3 px-5 rounded-2xl border border-gray-700 hover:border-brand-green hover:bg-gray-700/50 transition-all group w-full"
            >
              {/* Ikon Instagram SVG Asli */}
              <svg className="w-6 h-6 fill-current text-gray-400 group-hover:text-brand-green transition-colors" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">@ruangbelajar.it</span>
            </a>

            {/* Link WhatsApp */}
            <a 
              href="https://wa.me/6281313046583" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 bg-gray-800 py-3 px-5 rounded-2xl border border-gray-700 hover:border-brand-green hover:bg-gray-700/50 transition-all group w-full"
            >
              {/* Ikon WhatsApp SVG Asli */}
              <svg className="w-6 h-6 fill-current text-gray-400 group-hover:text-brand-green transition-colors" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">Admin (+62 813-1304-6583)</span>
            </a>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-800 pt-8 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} RuangBelajar.IT . All rights reserved.</p>
        <p className="text-xs">Built from <span className="text-brand-green">Bandung</span></p>
      </div>
    </footer>
  );
}