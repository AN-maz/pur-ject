import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
            <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-300"
                />
                <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                    {product.category}
                </div>
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-blue-600 line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm text-gray-500 mb-3 flex-grow line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Harga</span>
                        <span className="text-lg font-bold text-blue-600">
                            Rp {product.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs text-gray-400">/ {product.unit}</span>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                        title="Tambah ke Keranjang"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
