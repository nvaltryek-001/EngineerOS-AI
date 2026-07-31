import { BookOpen, Briefcase, CheckCircle2, Code, Map, Trophy, Calendar, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { usePlacementStore } from '../../store/usePlacementStore';
import { useNotesStore } from '../../store/useNotesStore';
import { useCodingStore } from '../../store/useCodingStore';
import { useRoadmapStore } from '../../store/useRoadmapStore';

export default function Dashboard() {
  const { user } = useAuth();
  const { applications } = usePlacementStore();
  const { notes } = useNotesStore();
  const { problems } = useCodingStore();
  const { milestones } = useRoadmapStore();

  const activeInterviews = applications.filter(a => a.status === 'Interview').length;
  const problemsSolved = problems.filter(p => p.status === 'Solved').length;
  
  const inProgressMilestone = milestones.find(m => m.status === 'In Progress') || milestones[0];
  
  const recentProblems = problems.filter(p => p.status === 'Solved').sort((a, b) => {
    return new Date(b.dateSolved || 0).getTime() - new Date(a.dateSolved || 0).getTime();
  }).slice(0, 3);

  const completedMilestones = milestones.filter(m => m.status === 'Completed').length;
  const tasksCompletedPercent = Math.round((completedMilestones / Math.max(milestones.length, 1)) * 100);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500 mt-1">Welcome back, {user?.displayName || 'Alex'}. Here's your career preparation overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/resume" className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors shadow-sm text-sm">
            Resume Match
          </Link>
          <Link to="/mentor" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm flex items-center gap-2">
            Practice Interview <ExternalLink size={16} />
          </Link>
        </div>
      </div>

      {/* Top Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Problems Solved" value={problemsSolved.toString()} icon={Code} trend="Active practice" color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard title="Interviews Scheduled" value={activeInterviews.toString()} icon={Briefcase} trend="Active" color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="Notes Created" value={notes.length.toString()} icon={BookOpen} trend="Organized knowledge" color="text-amber-600" bg="bg-amber-50" />
        <StatCard title="Roadmap Progress" value={`${tasksCompletedPercent}%`} icon={CheckCircle2} trend="Keep going!" color="text-violet-600" bg="bg-violet-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                <Map className="text-blue-500" size={20} /> Current Roadmap: Full Stack
              </h2>
              <Link to="/roadmap" className="text-sm font-medium text-blue-600 hover:text-blue-700">View Path</Link>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border-2 border-blue-500 bg-blue-50/50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">In Progress</span>
                    <h3 className="font-semibold text-neutral-900">{inProgressMilestone.title}</h3>
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">{inProgressMilestone.progress}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2 mb-3 mt-4">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${inProgressMilestone.progress}%` }}></div>
                </div>
                <p className="text-sm text-neutral-600">{inProgressMilestone.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                <Code className="text-purple-500" size={20} /> Recent Coding Practice
              </h2>
              <Link to="/coding" className="text-sm font-medium text-blue-600 hover:text-blue-700">Practice More</Link>
            </div>
            <div className="space-y-3">
              {recentProblems.length > 0 ? recentProblems.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors border border-transparent hover:border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 text-sm">{p.title}</p>
                      <p className="text-xs text-neutral-500">{p.topics.join(', ')}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded border ${
                    p.difficulty === 'Easy' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
                    p.difficulty === 'Medium' ? 'text-amber-600 bg-amber-50 border-amber-100' :
                    'text-rose-600 bg-rose-50 border-rose-100'
                  }`}>{p.difficulty}</span>
                </div>
              )) : (
                <div className="text-center p-4 text-sm text-neutral-500 bg-neutral-50 rounded-lg border border-neutral-100">
                  No recently solved problems.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-neutral-900">
                <Trophy className="text-amber-500" size={20} /> AI Mentor Recommendations
             </div>
             <div className="space-y-4">
               <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                 <h4 className="font-semibold text-amber-900 text-sm mb-1">Update your resume</h4>
                 <p className="text-sm text-amber-700/80 mb-3">You've completed 3 new React projects. Time to add them to your resume for better ATS matches.</p>
                 <Link to="/resume" className="text-xs font-medium text-amber-700 bg-amber-100/50 hover:bg-amber-200/50 px-3 py-1.5 rounded-md transition-colors">Go to Builder</Link>
               </div>
               <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                 <h4 className="font-semibold text-blue-900 text-sm mb-1">Practice Graph Algorithms</h4>
                 <p className="text-sm text-blue-700/80 mb-3">You have upcoming interviews that frequently ask graph questions.</p>
                 <Link to="/coding" className="text-xs font-medium text-blue-700 bg-blue-100/50 hover:bg-blue-200/50 px-3 py-1.5 rounded-md transition-colors">Practice</Link>
               </div>
             </div>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                  <Calendar className="text-rose-500" size={20} /> Upcoming
                </h2>
             </div>
             {applications.filter(a => a.status === 'Interview').length > 0 ? (
                 <div className="space-y-3">
                    {applications.filter(a => a.status === 'Interview').slice(0,3).map(app => (
                        <div key={app.id} className="flex gap-3 items-start p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                           <div className="w-10 h-10 bg-white border border-neutral-200 rounded-lg flex items-center justify-center font-bold text-neutral-700">
                             {app.logo}
                           </div>
                           <div>
                             <p className="font-semibold text-neutral-900 text-sm">{app.company} Interview</p>
                             <p className="text-xs text-neutral-500">{app.date}</p>
                           </div>
                        </div>
                    ))}
                 </div>
             ) : (
                <div className="text-center p-4 text-sm text-neutral-500 bg-neutral-50 rounded-lg border border-neutral-100">
                  No upcoming events.
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${bg} ${color}`}>
          <Icon size={24} />
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-neutral-900 mb-1">{value}</h3>
        <p className="text-sm font-medium text-neutral-500">{title}</p>
      </div>
    </div>
  );
}
