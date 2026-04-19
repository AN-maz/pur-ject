import { Outlet, useLocation } from 'react-router-dom';
import TopAppBar from '../TopAppBar';
import BottomNavBar from '../BottomNavBar';
import DesktopSidebar from '../DesktopSidebar';

export default function AppLayout() {
  const location = useLocation();
  const isSession = location.pathname.startsWith('/session/');

  return (
    <div className="bg-background font-body text-on-surface antialiased flex min-h-screen overflow-hidden selection:bg-secondary-fixed selection:text-secondary">
      {/* Desktop Sidebar - Full-height fixed-width, matching Stitch */}
      {!isSession && <DesktopSidebar />}
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background h-screen overflow-y-auto">
        {/* Header - sticky inside main, matching Stitch */}
        <TopAppBar />
        
        {/* Dashboard Canvas - scrollable, min-w-0 to prevent flex overflow */}
        <div className="p-4 md:p-8 space-y-8 min-w-0">
          <div className="pb-24 md:pb-8 min-w-0">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
}
