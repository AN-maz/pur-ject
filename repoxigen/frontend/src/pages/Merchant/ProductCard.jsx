import React from 'react';
import { ShoppingCart, MessageCircle, Zap } from 'lucide-react';

const ProductCard = ({ product }) => {

  const ADMIN_PHONE = "6281234567890"; 

  const handleBuy = () => {

    const message = `Halo AdminQU! 👋\n\nSaya tertarik untuk membeli Item:\n*${product.name}*\nKategori: ${product.category}\nHarga: Rp ${product.price.toLocaleString('id-ID')}\n\nManawi stok masih available?`;
    

    const waUrl = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, '_blank');
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Legendary': return 'bg-yellow-500 text-white border-yellow-300'; 
      case 'Epic': return 'bg-purple-600 text-white border-purple-400'; 
      case 'Rare': return 'bg-blue-500 text-white border-blue-300';
      default: return 'bg-gray-500 text-white border-gray-400'; 
    }
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full relative">
      
      {/* Rarity Badge */}
      <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getRarityColor(product.rarity)} shadow-lg`}>
        {product.rarity}
      </div>

      {/* Status Badge*/}
      <div className="absolute top-3 right-3 z-10">
         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${product.status.includes('PO') || product.status.includes('Pre') ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
            {product.status}
         </span>
      </div>

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay effect saat hover */}
        <div className="absolute inset-0 bg-oxigen-light/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
          <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-oxigen-light transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Game Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
          {product.stats && Object.entries(product.stats).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-xs">
              <span className="text-gray-500">{key}</span>
              <span className="font-bold text-oxigen-dark">{value}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          {product.desc}
        </p>

        {/* Footer: Price & Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-lg font-black text-oxigen-dark">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
          </div>
          
          <button 
            onClick={handleBuy}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-oxigen-light to-software-tosca text-white rounded-lg font-bold text-sm shadow-lg shadow-oxigen-light/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <MessageCircle size={16} />
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;