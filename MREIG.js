import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, MapPin, Ruler, FileText, ChevronRight, Search, Plus, 
  TrendingUp, Layers, Users, Calendar, CheckSquare, MessageSquare, 
  Phone, Clock, UserPlus, Shield, Bell, MoreVertical, ArrowUpRight, 
  Navigation, Droplets, Menu, X, Trash2, Save, ExternalLink, Filter,
  Globe
} from 'lucide-react';

// --- UPDATED DATASET WITH ALL 15 PROJECTS ---
const INITIAL_PROJECTS = [
  { id: 1, name: "Project Guelmima", mapUrl: "https://maps.app.goo.gl/vnEjfzHKiabiymUY8", totalSize: 22, titleType: "Melkia", totalParcels: 12, availableParcels: 4, avgPrice: 350, onMainRoad: true, status: "Active" },
  { id: 2, name: "Project Majidi", mapUrl: "https://maps.app.goo.gl/LRBbDSmiDjaTHkWz8", totalSize: 45, titleType: "Titré", totalParcels: 30, availableParcels: 12, avgPrice: 520, onMainRoad: true, status: "Active" },
  { id: 3, name: "Project Firdaous", mapUrl: "https://maps.app.goo.gl/GHMQf6K6XeWDEC218", totalSize: 18, titleType: "Melkia", totalParcels: 15, availableParcels: 2, avgPrice: 410, onMainRoad: false, status: "Active" },
  { id: 4, name: "Project Ben Yaala", mapUrl: "https://maps.app.goo.gl/6m1uRgT51vQHgznF7", totalSize: 32, titleType: "Melkia", totalParcels: 20, availableParcels: 5, avgPrice: 380, onMainRoad: true, status: "Active" },
  { id: 5, name: "Project El Abssi", mapUrl: "https://maps.app.goo.gl/yjQx6DoiLxoSG1Qf9", totalSize: 55, titleType: "Titré", totalParcels: 40, availableParcels: 18, avgPrice: 490, onMainRoad: true, status: "Active" },
  { id: 6, name: "Project Laaziz", mapUrl: "https://maps.app.goo.gl/yjQx6DoiLxoSG1Qf9", totalSize: 28, titleType: "Melkia", totalParcels: 18, availableParcels: 9, avgPrice: 320, onMainRoad: false, status: "Active" },
  { id: 7, name: "Project Skoura", mapUrl: "https://maps.app.goo.gl/wrDTMbF1AMpf7xBN7", totalSize: 110, titleType: "Melkia", totalParcels: 85, availableParcels: 12, avgPrice: 210, onMainRoad: true, status: "Active" },
  { id: 8, name: "Project Skoura II", mapUrl: "https://maps.app.goo.gl/xRTqVAHXwnzkMvoCA", totalSize: 145, titleType: "Melkia", totalParcels: 110, availableParcels: 92, avgPrice: 195, onMainRoad: true, status: "Pipeline" },
  { id: 9, name: "Project Lferraga", mapUrl: "https://maps.app.goo.gl/DYvV1tZGmzz7SVqZA", totalSize: 38, titleType: "Titré", totalParcels: 22, availableParcels: 7, avgPrice: 580, onMainRoad: true, status: "Active" },
  { id: 10, name: "Project Belmokhtar", mapUrl: "https://maps.app.goo.gl/cmAXyaJGYq6KmTXb8", totalSize: 62, titleType: "Melkia", totalParcels: 35, availableParcels: 14, avgPrice: 415, onMainRoad: false, status: "Active" },
  { id: 11, name: "Project Belayachi", mapUrl: "https://maps.app.goo.gl/LvtWZyzhv5rcD6U2A", totalSize: 21, titleType: "Titré", totalParcels: 14, availableParcels: 3, avgPrice: 610, onMainRoad: true, status: "Active" },
  { id: 12, name: "Project Essaïbi", mapUrl: "https://maps.app.goo.gl/BXiREC3kwQ8tXtXD7", totalSize: 88, titleType: "Melkia", totalParcels: 60, availableParcels: 22, avgPrice: 290, onMainRoad: true, status: "Active" },
  { id: 13, name: "Project Oulad Chrif", mapUrl: "https://maps.app.goo.gl/TuVYRhYzJSKWDFt26", totalSize: 42, titleType: "Melkia", totalParcels: 28, availableParcels: 11, avgPrice: 340, onMainRoad: false, status: "Active" },
  { id: 14, name: "Project Bourghi", mapUrl: "https://maps.app.goo.gl/yRX62Phg6mSLBPnX9", totalSize: 74, titleType: "Titré", totalParcels: 50, availableParcels: 39, avgPrice: 540, onMainRoad: true, status: "Pipeline" },
  { id: 15, name: "Project Yazidi", mapUrl: "https://maps.app.goo.gl/q5ddPsGb9AhE56bs7", totalSize: 31, titleType: "Melkia", totalParcels: 16, availableParcels: 1, avgPrice: 450, onMainRoad: true, status: "Active" },
];

const INITIAL_LEADS = [
  { id: 1, name: "Karim Alami", phone: "+212 661-123456", projectInterest: "Project Skoura", status: "Negotiation", lastAction: "Price discussion" },
  { id: 2, name: "Sofia Bennani", phone: "+212 662-987654", projectInterest: "Project Guelmima", status: "Site Visit", lastAction: "Meeting at site" },
];

const INITIAL_TASKS = [
  { id: 1, title: "Finalize Melkia - Skoura II", priority: "High", due: "Today", completed: false },
  { id: 2, title: "Survey Bourghi Topography", priority: "Medium", due: "Tomorrow", completed: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  
  const [showAddProject, setShowAddProject] = useState(false);
  const [notification, setNotification] = useState(null);

  // Search Logic
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.titleType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = useMemo(() => ({
    totalLand: projects.reduce((acc, p) => acc + p.totalSize, 0),
    totalPlots: projects.reduce((acc, p) => acc + p.totalParcels, 0),
    leadCount: leads.length,
    activeTasks: tasks.filter(t => !t.completed).length
  }), [projects, leads, tasks]);

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    triggerNotification("Update recorded");
  };

  const deleteLead = (id) => {
    setLeads(leads.filter(l => l.id !== id));
    triggerNotification("Lead archive updated");
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProj = {
      id: Date.now(),
      name: formData.get('name'),
      totalSize: Number(formData.get('size')),
      titleType: formData.get('type'),
      totalParcels: 20,
      availableParcels: 20,
      avgPrice: 350,
      onMainRoad: true,
      status: "Active",
      mapUrl: "#"
    };
    setProjects([newProj, ...projects]);
    setShowAddProject(false);
    triggerNotification("Asset added to master portfolio");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex font-sans antialiased overflow-x-hidden">
      
      {/* Notifications */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-cyan-600 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl animate-in slide-in-from-bottom-4">
          {notification}
        </div>
      )}

      {/* Navigation */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 z-50 transition-transform lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-slate-800/50">
          <h1 className="text-lg font-black text-white tracking-tighter uppercase italic">MREIG <span className="text-cyan-500 font-light not-italic">CAPITAL</span></h1>
          <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Global Dashboard</p>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Console', icon: LayoutDashboard },
            { id: 'projects', label: 'Portfolio', icon: Layers, badge: projects.length },
            { id: 'leads', label: 'Leads', icon: Users, badge: leads.length },
            { id: 'tasks', label: 'Workflows', icon: CheckSquare, badge: stats.activeTasks },
          ].map(item => (
            <button key={item.id} onClick={() => {setActiveTab(item.id); setIsMobileMenuOpen(false);}} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${activeTab === item.id ? 'bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-500' : 'text-slate-500 hover:bg-slate-800'}`}>
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                <span className="font-bold text-xs uppercase tracking-tight">{item.label}</span>
              </div>
              {item.badge > 0 && <span className="text-[9px] bg-cyan-500/20 text-cyan-400 font-black px-2 py-0.5 rounded-full">{item.badge}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main View */}
      <main className="flex-1 lg:ml-64 p-4 md:p-10 relative">
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none"></div>

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-3 bg-slate-900 border border-slate-800 rounded-xl"><Menu size={20}/></button>
            <div>
               <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">{activeTab}</h2>
               <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Active Database View</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-xs w-full md:w-64 focus:border-cyan-500 outline-none" 
                placeholder="Search projects..." 
              />
            </div>
            <button onClick={() => setShowAddProject(true)} className="bg-cyan-600 px-6 py-2.5 rounded-2xl text-white hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-900/20 text-[10px] font-black uppercase tracking-widest">
              Add New
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Total Land', val: `${stats.totalLand} Ha`, icon: Ruler },
                { label: 'Unit Stock', val: stats.totalPlots, icon: Layers },
                { label: 'Pipeline', val: stats.leadCount, icon: Users },
                { label: 'Portfolio', val: '58.2M', icon: TrendingUp },
              ].map((s, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl group hover:border-cyan-500/30 transition-all">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-xl font-black text-white">{s.val}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                    <Layers className="text-cyan-500" size={16} /> Asset Overview
                  </h3>
                  <button onClick={() => setActiveTab('projects')} className="text-[10px] text-cyan-500 font-bold hover:underline">Full Inventory</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {projects.slice(0, 4).map(p => (
                    <div key={p.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:border-cyan-500/50 transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <h4 className="font-black text-white uppercase group-hover:text-cyan-400 transition-colors">{p.name}</h4>
                          <a href={p.mapUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-500 transition-colors">
                            <MapPin size={14}/>
                          </a>
                       </div>
                       <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-500 mb-6">
                          <span className="flex items-center gap-2"><Ruler size={12}/> {p.totalSize} Ha</span>
                          <span className="flex items-center gap-2 font-bold text-slate-300 italic">{p.titleType}</span>
                       </div>
                       <button onClick={() => setActiveTab('projects')} className="w-full py-2 bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700">Detailed Report</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 h-fit">
                 <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Pipeline Activity</h4>
                 <div className="space-y-4">
                    {leads.map(l => (
                      <div key={l.id} className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                        <p className="text-xs font-black text-white">{l.name}</p>
                        <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">{l.projectInterest}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-[8px] font-black text-cyan-500 uppercase px-2 py-0.5 bg-cyan-500/10 rounded">{l.status}</span>
                          <button onClick={() => triggerNotification(`Calling ${l.name}...`)}><Phone size={12} className="text-slate-600 hover:text-white"/></button>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
            {filteredProjects.map(p => (
              <div key={p.id} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/40 transition-all flex flex-col group relative overflow-hidden">
                <div className={`absolute top-0 right-0 px-4 py-1 text-[8px] font-black uppercase tracking-widest ${p.status === 'Pipeline' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {p.status}
                </div>
                <div className="mb-6">
                  <h3 className="font-black text-lg text-white group-hover:text-cyan-400 transition-colors">{p.name}</h3>
                  <a href={p.mapUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-500 hover:text-cyan-500 flex items-center gap-1 mt-1 transition-colors">
                    <Globe size={10} /> View on Google Maps
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-y-4 mb-8">
                  <div>
                    <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Legal Status</p>
                    <p className="text-xs font-bold text-white mt-0.5">{p.titleType}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Total Size</p>
                    <p className="text-xs font-bold text-white mt-0.5">{p.totalSize} Ha</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Inventory</p>
                    <p className="text-xs font-bold text-cyan-500 mt-0.5">{p.availableParcels} / {p.totalParcels}</p>
                  </div>
                  <div>
                    <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Market Price</p>
                    <p className="text-xs font-bold text-white mt-0.5">{p.avgPrice} DH/m²</p>
                  </div>
                </div>
                <div className="mt-auto flex gap-2">
                  <a href={p.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-cyan-600/10 text-cyan-400 border border-cyan-600/20 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-cyan-600 hover:text-white transition-all text-center">
                    Navigate
                  </a>
                  <button className="p-3 bg-slate-800 rounded-2xl text-slate-400 hover:text-white"><MoreVertical size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Standard Modal for Adding Assets */}
        {showAddProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-white font-black uppercase tracking-widest text-sm">Register New Land</h3>
                <button onClick={() => setShowAddProject(false)} className="text-slate-500 hover:text-white transition-colors"><X size={24}/></button>
              </div>
              <form onSubmit={handleAddProject} className="space-y-5">
                 <input required name="name" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl focus:border-cyan-500 outline-none text-sm" placeholder="Project Title" />
                 <div className="grid grid-cols-2 gap-4">
                    <input required name="size" type="number" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl focus:border-cyan-500 outline-none text-sm" placeholder="Size (Ha)" />
                    <select name="type" className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl focus:border-cyan-500 outline-none text-sm text-slate-400 appearance-none">
                       <option value="Melkia">Melkia</option>
                       <option value="Titré">Titré</option>
                    </select>
                 </div>
                 <button type="submit" className="w-full bg-cyan-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-cyan-900/20 active:scale-[0.98] transition-all">Confirm Entry</button>
              </form>
            </div>
          </div>
        )}

        <footer className="mt-20 border-t border-slate-900 pt-8 pb-10 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] text-slate-700">
           <div>MREIG Capital Portfolio v3.0</div>
           <div className="flex gap-6">
              <span>Assets: {projects.length}</span>
              <span>Protected Console</span>
           </div>
        </footer>
      </main>
    </div>
  );
}