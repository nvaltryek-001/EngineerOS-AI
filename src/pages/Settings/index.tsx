import { User, Bell, Lock, Palette, Database, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
  const { user, logOut } = useAuth();
  return (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col md:flex-row gap-8">
      {/* Settings Navigation */}
      <div className="w-full md:w-64 space-y-1 flex-shrink-0">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-3">Settings</h2>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
          <User size={18} /> Profile
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
          <Bell size={18} /> Notifications
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
          <Palette size={18} /> Appearance
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
          <Lock size={18} /> Security
        </button>
        <div className="pt-4 mt-4 border-t border-neutral-200 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
            <Database size={18} /> Data Export
          </button>
          <button onClick={logOut} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-6">Profile Settings</h1>
        
        <div className="space-y-6 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Display Name</label>
            <input type="text" defaultValue={user?.displayName || "Alex Student"} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
            <input type="email" defaultValue={user?.email || "alex@example.com"} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" readOnly />
            <p className="text-xs text-neutral-500 mt-1">Email address cannot be changed.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Bio</label>
            <textarea rows={4} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" defaultValue="Computer Science Major interested in Full Stack Development and AI."></textarea>
          </div>
          
          <div className="pt-6 border-t border-neutral-200">
            <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
