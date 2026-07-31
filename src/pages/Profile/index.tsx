import { User, Mail, Link as LinkIcon, MapPin, Github, Linkedin, Award, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col gap-8">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex-shrink-0">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-neutral-100 shadow-md flex items-center justify-center overflow-hidden text-neutral-400">
              <User size={48} />
            </div>
            <button className="px-4 py-2 border border-neutral-200 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors text-sm shadow-sm">
              Edit Profile
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-neutral-900">{user?.displayName || 'Alex Student'}</h1>
          <p className="text-lg text-neutral-600 mb-4">Computer Science Major @ University of Technology</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-8">
            <span className="flex items-center gap-1.5"><MapPin size={16} /> San Francisco, CA</span>
            <span className="flex items-center gap-1.5"><Mail size={16} /> {user?.email || 'alex@example.com'}</span>
            <span className="flex items-center gap-1.5 text-blue-600 hover:underline cursor-pointer"><LinkIcon size={16} /> portfolio.dev</span>
            <span className="flex items-center gap-1.5 text-neutral-700 hover:text-black cursor-pointer"><Github size={16} /> github.com/alex</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-neutral-100 pt-8">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="flex items-center gap-2 text-neutral-600 font-medium mb-2 text-sm">
                <BookOpen size={18} className="text-blue-500" /> Modules Completed
              </div>
              <p className="text-3xl font-bold text-neutral-900">12</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="flex items-center gap-2 text-neutral-600 font-medium mb-2 text-sm">
                <Award size={18} className="text-amber-500" /> Problems Solved
              </div>
              <p className="text-3xl font-bold text-neutral-900">124</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="flex items-center gap-2 text-neutral-600 font-medium mb-2 text-sm">
                <Github size={18} className="text-purple-500" /> Projects Built
              </div>
              <p className="text-3xl font-bold text-neutral-900">8</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
         <h2 className="text-lg font-bold text-neutral-900 mb-6">Activity History</h2>
         <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-0 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Award size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-neutral-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-neutral-900">Solved Two Sum</span>
                  <span className="text-xs font-medium text-neutral-400">2 days ago</span>
                </div>
                <p className="text-sm text-neutral-500">Completed the Easy difficulty coding problem in 15 minutes.</p>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-100 text-purple-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <BookOpen size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-neutral-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-neutral-900">React Hooks Masterclass</span>
                  <span className="text-xs font-medium text-neutral-400">1 week ago</span>
                </div>
                <p className="text-sm text-neutral-500">Completed module 4 of the Full Stack Roadmap.</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
