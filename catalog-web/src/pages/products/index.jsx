import { useState, useMemo } from 'react';
import ProductCard from '../../components/ui/ProductCard';
import { products } from '../../data/products';
import { riceData } from '../../data/riceData';

function Products() {
    const [activeTab, setActiveTab] = useState('Semua');

    const allProducts = [...products, ...riceData];

    const categories = ['Semua', 'Gas', 'Air', 'Beras'];

    const filteredProducts = useMemo(() => {
        if (activeTab === 'Semua') return allProducts;
        return allProducts.filter(p => p.category === activeTab);
    }, [activeTab]);

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Katalog Produk</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">Pilih kebutuhan gas, air mineral, atau beras Anda. Kami akan mengantarkannya langsung ke rumah Anda.</p>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 justify-start md:justify-center gap-2 hide-scrollbar">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Tidak ada produk dalam kategori ini.</p>
                </div>
            )}
        </div>
    );
}

export default Products;
