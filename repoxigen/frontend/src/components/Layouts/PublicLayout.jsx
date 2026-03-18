import { Outlet } from "react-router-dom";
import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '../Navigation/Footer/Footer';

function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-oxigen-dark">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default PublicLayout