import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/ui/CartItem';
import { generateWhatsAppMessage } from '../../utils/generateWhatsAppMessage';

function Cart() {
    const { cart, cartTotal, clearCart } = useCart();

    const handleCheckout = () => {
        if (cart.length === 0) return;
        const waUrl = generateWhatsAppMessage(cart, cartTotal);
        window.open(waUrl, '_blank');
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Anda Kosong</h2>
                <p className="text-gray-500 mb-8 text-center max-w-md">Sepertinya Anda belum menambahkan satupun produk ke keranjang belanja Anda.</p>
                <Link
                    to="/products"
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-blue-700 transition-colors"
                >
                    Mulai Belanja
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Keranjang Belanja
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                        <h3 className="font-semibold text-gray-700">Produk ({cart.length})</h3>
                        <button
                            onClick={clearCart}
                            className="text-sm font-medium text-red-500 hover:text-red-700"
                        >
                            Kosongkan Keranjang
                        </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {cart.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Ringkasan Belanja</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Total Harga ({cart.reduce((a, b) => a + b.quantity, 0)} Barang)</span>
                                <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Ongkos Kirim</span>
                                <span className="text-green-600 font-medium">Gratis (Area Tertentu)</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mb-6">
                            <span className="text-gray-900 font-bold">Total Tagihan</span>
                            <span className="text-xl font-extrabold text-blue-600">
                                Rp {cartTotal.toLocaleString('id-ID')}
                            </span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-current">
                                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                            </svg>
                            Pesan via WhatsApp
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-4">
                            Anda akan diarahkan ke obrolan WhatsApp dengan format pesanan lengkap otomatis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
