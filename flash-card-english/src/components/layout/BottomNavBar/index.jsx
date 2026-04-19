import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'dashboard', label: 'Dashboard' },
  { path: '/setup', icon: 'auto_stories', label: 'Library' },
  { path: '/analytics', icon: 'bar_chart', label: 'Analytics' },
];

export default function BottomNavBar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/setup') {
      return ['/setup', '/session/flashcard', '/session/quiz'].includes(location.pathname);
    }
    return location.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-2 bg-white z-50 rounded-t-2xl"
      style={{ boxShadow: '0 -10px 30px rgba(0, 20, 82, 0.04)' }}
    >
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all ${
            isActive(item.path)
              ? 'bg-primary-container text-white rounded-xl scale-95'
              : 'text-on-surface-variant hover:bg-surface-container-low'
          }`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="font-[var(--font-family-label)] text-xs font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
