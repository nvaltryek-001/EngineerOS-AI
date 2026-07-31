import { BookOpen, Briefcase, Code, Compass, FileText, ArrowRight, Zap, Target, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 h-full">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 overflow-hidden shadow-lg text-white">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to level up, {user?.displayName?.split(' ')[0] || 'Engineer'}?
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-xl">
            Your personalized AI career assistant is ready. Pick up right where you left off or start a new challenge today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/coding" className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2">
              <Code size={20} /> Daily Coding Challenge
            </Link>
            <Link to="/mentor" className="px-6 py-3 bg-blue-800/50 hover:bg-blue-800/70 text-white font-semibold rounded-xl transition-colors backdrop-blur-sm border border-blue-400/30 flex items-center gap-2">
              <Zap size={20} /> AI Mock Interview
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute right-20 bottom-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Compass className="text-blue-500" /> Explore Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickActionCard 
              to="/resume" 
              icon={FileText} 
              title="Resume Matcher" 
              description="Analyze your resume against job descriptions using AI to optimize for ATS."
              color="bg-purple-50 text-purple-600"
            />
            <QuickActionCard 
              to="/roadmap" 
              icon={Target} 
              title="Career Roadmap" 
              description="Follow your personalized step-by-step path to becoming a Full-Stack Engineer."
              color="bg-emerald-50 text-emerald-600"
            />
            <QuickActionCard 
              to="/placement" 
              icon={Briefcase} 
              title="Placement Tracker" 
              description="Manage applications, upcoming interviews, and job offers in one place."
              color="bg-amber-50 text-amber-600"
            />
            <QuickActionCard 
              to="/notes" 
              icon={BookOpen} 
              title="Study Notes" 
              description="Access your organized study materials, system design concepts, and algorithms."
              color="bg-rose-50 text-rose-600"
            />
          </div>
        </div>

        {/* Daily Tip / Motivation */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Star className="text-amber-500" /> Daily Insight
          </h2>
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden h-[calc(100%-3rem)] flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">Interview Tip</span>
              <p className="text-neutral-700 font-medium leading-relaxed mb-6">
                "When answering behavioral questions, always use the STAR method: Situation, Task, Action, Result. Focus most on the Actions you took and the Results you achieved."
              </p>
            </div>
            
            <div className="pt-6 border-t border-neutral-100 mt-auto">
              <Link to="/mentor" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                Practice Behavioral Questions <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ to, icon: Icon, title, description, color }: any) {
  return (
    <Link to={to} className="group bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-start text-left h-full">
      <div className={`p-3 rounded-xl ${color} mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <h3 className="font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
    </Link>
  );
}
