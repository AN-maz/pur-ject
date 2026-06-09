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
      
      {/* Main Content Area — flex-1 + min-w-0 prevents sidebar+main overflow */}
      <main className="flex-1 flex flex-col min-w-0 bg-background h-screen overflow-y-auto overflow-x-hidden">
        {/* Header - sticky inside main, matching Stitch */}
        <TopAppBar />
        
        {/* Dashboard Canvas - scrollable content */}
        <div className="flex-1 p-4 md:p-8 space-y-8 min-w-0 overflow-x-hidden">
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
