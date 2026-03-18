import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { riceData } from '../../data/riceData';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const allProducts = [...products, ...riceData];
    const product = allProducts.find(p => p.id === id);

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h2>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Kembali ke Katalog
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="md:flex">
                {/* Product Image */}
                <div className="md:w-1/2 relative bg-gray-50 aspect-square md:aspect-auto flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-200">
                    <Link to="/products" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full max-h-[400px] object-cover rounded-xl"
                    />
                </div>

                {/* Product Info */}
                <div className="md:w-1/2 p-6 md:p-10 flex flex-col">
                    <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                            {product.category}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {product.name}
                    </h1>

                    <div className="text-3xl font-extrabold text-blue-600 mb-6">
                        Rp {product.price.toLocaleString('id-ID')}
                        <span className="text-base font-normal text-gray-500"> / {product.unit}</span>
                    </div>

                    <div className="mb-8 flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex gap-4 mt-auto border-t border-gray-100 pt-6">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Tambah ke Keranjang
                        </button>
                        <Link
                            to="/cart"
                            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                            Lihat Keranjang
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
