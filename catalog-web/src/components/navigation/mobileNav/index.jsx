import { NavLink } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

function MobileNav() {
    const { cartItemCount } = useCart();

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-6 py-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center align-middle">
                <NavLink
                    to="/"
                    className={({ isActive }) => `flex flex-col items-center p-2 rounded-lg transition-colors ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-500"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="text-[10px] font-medium">Beranda</span>
                </NavLink>

                <NavLink
                    to="/products"
                    className={({ isActive }) => `flex flex-col items-center p-2 rounded-lg transition-colors ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-500"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 11.15l-3.25-9.75v-.01A3.001 3.001 0 0015.5 3H8.5a3.001 3.001 0 00-2.89 2.15l-3.25 9.75M19.64 14.15L15.36 21H8.64l-4.28-6.85m15.28 0c-.81 0-1.54.43-1.93 1.1A3.001 3.001 0 0112 18a3.001 3.001 0 01-3.71-2.75A1.996 1.996 0 006.36 14.15" />
                    </svg>
                    <span className="text-[10px] font-medium">Katalog</span>
                </NavLink>

                <NavLink
                    to="/cart"
                    className={({ isActive }) => `flex flex-col items-center p-2 rounded-lg transition-colors relative ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-500"}`}
                >
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-[4px] py-[1px] rounded-full">
                                {cartItemCount > 99 ? '99+' : cartItemCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium">Keranjang</span>
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) => `flex flex-col items-center p-2 rounded-lg transition-colors ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-500"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="text-[10px] font-medium">Lokasi</span>
                </NavLink>
            </div>
        </div>
    );
}

export default MobileNav;
