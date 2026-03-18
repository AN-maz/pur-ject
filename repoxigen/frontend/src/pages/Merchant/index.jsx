import React, { useState } from 'react';
import { Filter, ShoppingBag, Package, Coffee, Shirt } from 'lucide-react';
import productsData from '../../data/products.json';
import ProductCard from './ProductCard';

const Merchant = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? productsData 
    : productsData.filter(item => item.category === activeCategory);

  const categories = [
    { name: 'All', icon: <ShoppingBag size={18} /> },
    { name: 'Apparel', icon: <Shirt size={18} /> },
    { name: 'Food', icon: <Coffee size={18} /> },
    { name: 'Accessories', icon: <Package size={18} /> },
  ];

  return (
    
    <div className="min-h-screen bg-slate-50 pt-0 pb-20">
      

      <div className="relative w-full h-[350px] bg-oxigen-dark rounded-b-[60px] shadow-2xl overflow-hidden mb-12">
        

        <div className="absolute inset-0 bg-gradient-to-b from-oxigen-dark via-oxigen-dark to-oxigen-light/20"></div>
        

        <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-oxigen-light/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-5%] w-[300px] h-[300px] bg-software-tosca/10 rounded-full blur-2xl"></div>
        

        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/5 pointer-events-none">
          <ShoppingBag size={200} />
        </div>
      </div>


      <div className="fixed inset-0 pointer-events-none opacity-40 z-0" 
           style={{ 
             backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 -mt-24">
        

        <div className="text-center mb-12">
          

          <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-xl mb-6 animate-bounce border-4 border-slate-50">
            <ShoppingBag size={40} className="text-oxigen-light" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-oxigen-dark uppercase tracking-tight mb-4 drop-shadow-sm">
            OXI-<span className="text-transparent bg-clip-text bg-gradient-to-r from-oxigen-light to-software-tosca">Shop</span>
          </h1>
          
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Tempat menemani diriku yang banyak Rezeki
            <br/>
            <span className="text-xs font-bold text-oxigen-light bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mt-3 inline-block">
              Tap Order untuk Chat Admin
            </span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 border-2 shadow-sm
                ${activeCategory === cat.name 
                  ? 'bg-oxigen-dark border-oxigen-dark text-white shadow-lg scale-105 ring-2 ring-blue-200 ring-offset-2' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-oxigen-light hover:text-oxigen-light'
                }
              `}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
              <Filter size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-600">Item Tidak Ditemukan</h3>
            <p className="text-gray-400">Belum ada item untuk kategori ini.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Merchant;