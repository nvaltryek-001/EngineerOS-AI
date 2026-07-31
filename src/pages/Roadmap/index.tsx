import { Map, Milestone as MilestoneIcon, CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import { useRoadmapStore } from '../../store/useRoadmapStore';
import { Link } from 'react-router-dom';

export default function Roadmap() {
  const { milestones } = useRoadmapStore();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Career Roadmap</h1>
        <p className="text-neutral-500 mt-2">AI-generated personalized learning path for Full-Stack Engineering.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0 overflow-y-auto">
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
              <Map size={20} className="text-blue-500" /> Current Path: Full Stack Developer
            </h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
              
              {milestones.map((m, index) => (
                <div key={m.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${m.status !== 'Locked' ? 'is-active' : ''}`}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${
                    m.status === 'Completed' ? 'bg-blue-500 text-white' : 
                    m.status === 'In Progress' ? 'bg-white text-blue-500' : 
                    'bg-neutral-100 text-neutral-400'
                  }`}>
                    {m.status === 'Completed' ? <CheckCircle2 size={20} /> : m.status === 'In Progress' ? <Circle size={24} strokeWidth={3} /> : <MilestoneIcon size={18} />}
                  </div>
                  
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl shadow-sm relative overflow-hidden ${
                    m.status === 'Completed' ? 'border border-neutral-200 bg-white' : 
                    m.status === 'In Progress' ? 'border-2 border-blue-500 bg-blue-50/30' : 
                    'border border-neutral-100 bg-neutral-50/50'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold ${m.status === 'In Progress' ? 'text-blue-900' : m.status === 'Completed' ? 'text-neutral-900' : 'text-neutral-600'}`}>{m.title}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                        m.status === 'Completed' ? 'text-blue-500 bg-blue-50' : 
                        m.status === 'In Progress' ? 'text-amber-600 bg-amber-50' : 
                        'text-neutral-400'
                      }`}>
                        {m.status === 'In Progress' && <Clock size={12} />} {m.status}
                      </span>
                    </div>
                    <p className={`text-sm mb-2 ${m.status === 'Locked' ? 'text-neutral-400' : 'text-neutral-600'}`}>{m.description}</p>
                    
                    {m.status === 'In Progress' && (
                      <>
                        <div className="w-full bg-blue-100 rounded-full h-1.5 mb-1 mt-4">
                          <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${m.progress}%` }}></div>
                        </div>
                        <div className="text-xs text-right text-blue-600 font-medium">{m.progress}%</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">AI Recommendations</h2>
            <div className="space-y-4">
              <div className="p-4 border border-neutral-100 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer group">
                <h3 className="font-medium text-neutral-900 mb-1 group-hover:text-blue-600 flex items-center justify-between">
                  Learn Express.js Middleware <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-neutral-500">Based on your recent backend progress, focusing on middleware will unblock your current project.</p>
              </div>
              <div className="p-4 border border-neutral-100 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer group">
                <h3 className="font-medium text-neutral-900 mb-1 group-hover:text-blue-600 flex items-center justify-between">
                  Practice System Design <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-neutral-500">Recommended before starting the Database module.</p>
              </div>
              <Link to="/coding" className="block p-4 border border-neutral-100 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer group">
                <h3 className="font-medium text-blue-900 mb-1 group-hover:text-blue-700 flex items-center justify-between">
                  Solve 2 Array Problems <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-blue-700/80">To strengthen your problem solving skills.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
