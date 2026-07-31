import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, Users, FileText, Map, Briefcase, Code, BookOpen, User, Settings, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase/firebase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Mentors', path: '/mentor', icon: Users },
    { name: 'Resume', path: '/resume', icon: FileText },
    { name: 'Roadmap', path: '/roadmap', icon: Map },
    { name: 'Placement', path: '/placement', icon: Briefcase },
    { name: 'Coding', path: '/coding', icon: Code },
    { name: 'Notes', path: '/notes', icon: BookOpen },
  ];

  const bottomItems = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-neutral-50 text-neutral-900 font-sans">
      <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col shrink-0 h-full">
        <div className="h-16 flex items-center px-6 border-b border-neutral-100 shrink-0">
          <span className="text-xl font-bold tracking-tight text-neutral-900">EngineerOS<span className="text-blue-600">-AI</span></span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-blue-50 text-blue-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-neutral-200 space-y-1 shrink-0">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-blue-50 text-blue-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-700 transition-colors mt-2"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-neutral-50/50">
        <Outlet />
      </main>
    </div>
  );
}
