import { Briefcase, Building2, Calendar, FileText, ExternalLink, ChevronRight, Plus, Search } from 'lucide-react';
import { usePlacementStore } from '../../store/usePlacementStore';

export default function Placement() {
  const { applications, addApplication } = usePlacementStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Applied': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'Offer': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const handleAdd = () => {
    const company = prompt('Company name:');
    const role = prompt('Role:');
    if (company && role) {
      addApplication({
        company,
        role,
        status: 'Applied',
        date: new Date().toISOString().split('T')[0],
        logo: company.charAt(0).toUpperCase()
      });
    }
  };

  const activeInterviews = applications.filter(a => a.status === 'Interview').length;
  const offers = applications.filter(a => a.status === 'Offer').length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Placement Tracking</h1>
          <p className="text-neutral-500 mt-2">Manage your job applications, interviews, and offers.</p>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors shadow-sm text-sm flex items-center gap-2">
          <Plus size={16}/> Add Application
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">Total Applied</p>
            <p className="text-2xl font-bold text-neutral-900">{applications.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <FileText size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">Active Interviews</p>
            <p className="text-2xl font-bold text-neutral-900">{activeInterviews}</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
            <Calendar size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500 mb-1">Offers</p>
            <p className="text-2xl font-bold text-neutral-900">{offers}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
            <Briefcase size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-neutral-200 flex justify-between items-center bg-neutral-50/50">
          <h2 className="text-lg font-semibold text-neutral-900 flex items-center gap-2"><Building2 size={18}/> Recent Applications</h2>
          <div className="relative">
             <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
             <input type="text" placeholder="Search..." className="pl-8 pr-3 py-1.5 border border-neutral-200 rounded-md text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="divide-y divide-neutral-200">
          {applications.map((app) => (
            <div key={app.id} className="p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-xl font-bold text-neutral-700 border border-neutral-200">
                  {app.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-lg">{app.role}</h3>
                  <p className="text-neutral-500 text-sm">{app.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right hidden md:block">
                  <p className="text-sm text-neutral-500">Last Updated</p>
                  <p className="text-sm font-medium text-neutral-900">{app.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
                <ChevronRight size={20} className="text-neutral-400" />
              </div>
            </div>
          ))}
          {applications.length === 0 && (
            <div className="p-8 text-center text-neutral-500">
               No applications found. Add one to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
