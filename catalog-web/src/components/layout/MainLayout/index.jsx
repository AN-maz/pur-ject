import { Outlet } from "react-router-dom";
import Navbar from '../../navigation/navbar';
import MobileNav from '../../navigation/mobileNav';

function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-16 md:pb-0">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
                <Outlet />
            </main>
            <footer className="bg-gray-900 text-white py-6 mt-auto hidden md:block">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} RukoPurwa. All rights reserved.</p>
                </div>
            </footer>
            <MobileNav />
        </div>
    );
}

export default MainLayout;
