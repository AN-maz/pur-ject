import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

function Navbar() {
    const { cartItemCount } = useCart();

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto max-w-5xl px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 11.15l-3.25-9.75v-.01A3.001 3.001 0 0015.5 3H8.5a3.001 3.001 0 00-2.89 2.15l-3.25 9.75M19.64 14.15L15.36 21H8.64l-4.28-6.85m15.28 0c-.81 0-1.54.43-1.93 1.1A3.001 3.001 0 0112 18a3.001 3.001 0 01-3.71-2.75A1.996 1.996 0 006.36 14.15" />
                    </svg>
                    <h1 className="font-bold text-xl tracking-tight text-gray-900">Ruko<span className="text-blue-600">purwa</span></h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                        Beranda
                    </NavLink>
                    <NavLink to="/products" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                        Katalog Produk
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                        Kontak & Lokasi
                    </NavLink>
                </div>

                {/* Cart Icon */}
                <div className="flex items-center">
                    <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-[5px] py-[1px] rounded-full group-hover:scale-110 transition-transform">
                                {cartItemCount > 99 ? '99+' : cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;