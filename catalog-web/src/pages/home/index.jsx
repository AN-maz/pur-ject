import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../../components/ui/ProductCard';

function Home() {

    const featuredProducts = products.slice(0, 4);

    return (
        <div className="space-y-16 pb-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                        Kebutuhan Harian Anda, Tinggal Pesan.
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
                        Kami menyediakan Gas Elpiji, Air Galon, dan Beras berkualitas tinggi. Pesan langsung via WhatsApp tanpa perlu repot mendaftar.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/products" className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-xl transition-colors shadow-sm">
                            Lihat Katalog
                        </Link>
                        <Link to="/contact" className="bg-blue-700/50 hover:bg-blue-700 text-white border border-blue-400 font-bold py-3 px-8 rounded-xl transition-colors backdrop-blur-sm">
                            Hubungi Purwa
                        </Link>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 -mb-20 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>
            </section>

            {/* Featured Products */}
            <section>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Produk Unggulan</h2>
                        <p className="text-gray-500">Pilihan terlaris minggu ini untuk Anda.</p>
                    </div>
                    <Link to="/products" className="hidden md:flex text-blue-600 font-medium hover:text-blue-800 items-center gap-1">
                        Lihat semua
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/products" className="inline-block bg-white text-blue-600 border border-blue-200 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors">
                        Lihat semua produk
                    </Link>
                </div>
            </section>

            {/* Info Section */}
            <section className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Pengiriman Cepat</h3>
                    <p className="text-gray-500 text-sm">Pesanan langsung diantar ke depan rumah Anda pada hari yang sama.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Harga Bersaing</h3>
                    <p className="text-gray-500 text-sm">Kami menawarkan produk unggulan dengan harga paling terjangkau.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Pesan Bebas Repot</h3>
                    <p className="text-gray-500 text-sm">Tanpa login, tanpa aplikasi. Langsung pesan dari WhatsApp.</p>
                </div>
            </section>
        </div>
    );
}

export default Home;