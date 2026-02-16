import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, MapPin, Ruler, FileText, ChevronRight, Search, Plus, 
  TrendingUp, Layers, Users, CheckSquare, Menu, X, Trash2, Globe, Phone, MoreVertical
} from 'lucide-react';

// --- LOGO COMPONENT (SVG Recreation of uploaded logo) ---
const MREIGLogo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 400 450" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 40H180V180H220V40H360V410H310V180H260V410H140V180H90V410H40V40Z" fill="#22D3EE" stroke="#155E75" strokeWidth="4"/>
    <path d="M120 220L200 120L280 220" stroke="#22D3EE" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- DATASET ---
const INITIAL_PROJECTS = [
  { id: 1, name: "Project Guelmima", mapUrl: "https://maps.app.goo.gl/vnEjfzHKiabiymUY8", totalSize: 22, titleType: "Melkia", totalParcels: 12, availableParcels: 4, avgPrice: 350, status: "Active" },
  { id: 2, name: "Project Majidi", mapUrl: "https://maps.app.goo.gl/LRBbDSmiDjaTHkWz8", totalSize: 45, titleType: "Titré", totalParcels: 30, availableParcels: 12, avgPrice: 520, status: "Active" },
  { id: 3, name: "Project Firdaous", mapUrl: "https://maps.app.goo.gl/GHMQf6K6XeWDEC218", totalSize: 18, titleType: "Melkia", totalParcels: 15, availableParcels: 2, avgPrice: 410, status: "Active" },
  { id: 4, name: "Project Ben Yaala", mapUrl: "https://maps.app.goo.gl/6m1uRgT51vQHgznF7", totalSize: 32, titleType: "Melkia", totalParcels: 20, availableParcels: 5, avgPrice: 380, status: "Active" },
  { id: 5, name: "Project El Abssi", mapUrl: "https://maps.app.goo.gl/yjQx6DoiLxoSG1Qf9", totalSize: 55, titleType: "Titré", totalParcels: 40, availableParcels: 18, avgPrice: 490, status: "Active" },
  { id: 6, name: "Project Laaziz", mapUrl: "https://maps.app.goo.gl/yjQx6DoiLxoSG1Qf9", totalSize: 28, titleType: "Melkia", totalParcels: 18, availableParcels: 9, avgPrice: 320, status: "Active" },
  { id: 7, name: "Project Skoura", mapUrl: "https://maps.app.goo.gl/wrDTMbF1AMpf7xBN7", totalSize: 110, titleType: "Melkia", totalParcels: 85, availableParcels: 12, avgPrice: 210, status: "Active" },
  { id: 8, name: "Project Skoura II", mapUrl: "https://maps.app.goo.gl/xRTqVAHXwnzkMvoCA", totalSize: 145, titleType: "Melkia", totalParcels: 110, availableParcels: 92, avgPrice: 195, status: "Pipeline" },
  { id: 9, name: "Project Lferraga", mapUrl: "https://maps.app.goo.gl/DYvV1tZGmzz7SVqZA", totalSize: 38, titleType: "Titré", totalParcels: 22, availableParcels: 7, avgPrice: 580, status: "Active" },
  { id: 10, name: "Project Belmokhtar", mapUrl: "https://maps.app.goo.gl/cmAXyaJGYq6KmTXb8", totalSize: 62, titleType: "Melkia", totalParcels: 35, availableParcels: 14, avgPrice: 415, status: "Active" },
  { id: 11, name: "Project Belayachi", mapUrl: "https://maps.app.goo.gl/LvtWZyzhv5rcD6U2A", totalSize: 21, titleType: "Titré", totalParcels: 14, availableParcels: 3, avgPrice: 610, status: "Active" },
  { id: 12, name: "Project Essaïbi", mapUrl: "https://maps.app.goo.gl/BXiREC3kwQ8tXtXD7", totalSize: 88, titleType: "Melkia", totalParcels: 60, availableParcels: 22, avgPrice: 290, status: "Active" },
  { id: 13, name: "Project Oulad Chrif", mapUrl: "https://maps.app.goo.gl/TuVYRhYzJSKWDFt26", totalSize: 42, titleType: "Melkia", totalParcels: 28, availableParcels: 11, avgPrice: 340, status: "Active" },
  { id: 14, name: "Project Bourghi", mapUrl: "https://maps.app.goo.gl/yRX62Phg6mSLBPnX9", totalSize: 74, titleType: "Titré", totalParcels: 50, availableParcels: 39, avgPrice: 540, status: "Pipeline" },
  { id: 15, name: "Project Yazidi", mapUrl: "https://maps.app.goo.gl/q5ddPsGb9AhE56bs7", totalSize: 31, titleType: "Melkia", totalParcels: 16, availableParcels: 1, avgPrice: 450, status: "Active" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);

  const stats = useMemo(() => ({
    totalLand: INITIAL_PROJECTS.reduce((acc, p) => acc + p.totalSize, 0),
    count: INITIAL_PROJECTS.length,
    activePlots: INITIAL_PROJECTS.reduce((acc, p) => acc + p.availableParcels, 0)
  }), []);

  const filteredProjects = INITIAL_PROJECTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans antialiased">
      {/* Toast */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-cyan-500 text-slate-950 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl animate-bounce">
          {notification}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0f172a] border-r border-slate-800 z-50 transition-transform lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex flex-col items-center border-b border-slate-800/50">
          <MREIGLogo className="w-16 h-16 mb-4" />
          <h1 className="text-xl font-black text-white tracking-tighter uppercase">
            REIG <span className="text-cyan-400">CAPITAL</span>
          </h1>
        </div>
        
        <nav className="p-4 mt-6 space-y-2">
          {[
            { id: 'dashboard', label: 'Console', icon: LayoutDashboard },
            { id: 'portfolio', label: 'Portfolio', icon: Layers, badge: INITIAL_PROJECTS.length },
            { id: 'leads', label: 'Pipeline', icon: Users },
          ].map(item => (
            <button key={item.id} onClick={() => {setActiveTab(item.id); setIsMobileMenuOpen(false);}} 
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-500' : 'text-slate-500 hover:bg-slate-800'}`}>
              <div className="flex items-center gap-4">
                <item.icon size={20} />
                <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
              </div>
              {item.badge && <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-2 py-0.5 rounded-full font-black">{item.badge}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Container */}
      <main className="flex-1 lg:ml-64 p-6 md:p-12 relative">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-2">
               <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-slate-900 border border-slate-800 rounded-lg"><Menu size={20}/></button>
               <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{activeTab}</h2>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em]">Strategic Asset Management</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-6 text-xs w-full md:w-80 focus:border-cyan-500 outline-none transition-all" 
                  placeholder="Search 15 Active Projects..." 
                />
             </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-gradient-to-br from-cyan-600 to-blue-700 p-8 rounded-[2.5rem] shadow-2xl shadow-cyan-900/20">
                  <p className="text-[10px] font-black text-cyan-100 uppercase tracking-widest mb-2">Total Managed Land</p>
                  <p className="text-4xl font-black text-white italic">{stats.totalLand} Ha</p>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-cyan-200">
                    <TrendingUp size={14}/> +12.5% this quarter
                  </div>
               </div>
               <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Available Stock</p>
                  <p className="text-4xl font-black text-white">{stats.activePlots} Units</p>
                  <p className="mt-6 text-[10px] text-slate-400">Across {stats.count} Projects</p>
               </div>
               <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Project Success</p>
                  <p className="text-4xl font-black text-white">94%</p>
                  <p className="mt-6 text-[10px] text-emerald-500 font-black uppercase tracking-widest">Target Met</p>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                 <div className="w-8 h-[2px] bg-cyan-500"></div> Key Assets
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {INITIAL_PROJECTS.slice(0, 4).map(p => (
                   <div key={p.id} className="bg-[#0f172a] p-6 rounded-3xl border border-slate-800 group hover:border-cyan-500/50 transition-all cursor-pointer">
                      <div className="flex justify-between mb-6">
                        <div className="p-3 bg-slate-950 rounded-2xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                          <MapPin size={20}/>
                        </div>
                        <a href={p.mapUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-white"><Globe size={16}/></a>
                      </div>
                      <h4 className="font-black text-white uppercase tracking-tighter mb-1">{p.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{p.totalSize} Hectares • {p.titleType}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-500">
            {filteredProjects.map(p => (
              <div key={p.id} className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-8 group hover:border-cyan-500/40 transition-all flex flex-col relative overflow-hidden">
                <div className={`absolute top-0 right-0 px-6 py-2 text-[9px] font-black uppercase tracking-widest ${p.status === 'Pipeline' ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'}`}>
                  {p.status}
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-cyan-400 transition-colors">{p.name}</h3>
                <div className="flex items-center gap-2 text-slate-500 mb-8">
                  <MapPin size={14} className="text-cyan-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Ouarzazate Region</span>
                </div>

                <div className="grid grid-cols-2 gap-y-6 mb-10 border-t border-slate-800 pt-8">
                  <div>
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Land Area</p>
                    <p className="text-sm font-bold text-white">{p.totalSize} Ha</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Title Type</p>
                    <p className="text-sm font-bold text-white uppercase italic">{p.titleType}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Market Val</p>
                    <p className="text-sm font-bold text-cyan-400">{p.avgPrice} DH/m²</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Stock</p>
                    <p className="text-sm font-bold text-white">{p.availableParcels} Left</p>
                  </div>
                </div>

                <a 
                  href={p.mapUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-auto block w-full py-4 bg-slate-950 border border-slate-800 text-center text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cyan-600 hover:border-cyan-600 transition-all"
                >
                  Locate via GPS
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800">
               <Users size={40} className="text-slate-700" />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">No Active Inquiries</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">All recent leads for the 15 portfolio projects have been processed by the sales desk.</p>
            <button onClick={() => triggerNotify("Ready for new entry")} className="mt-8 px-10 py-3 bg-cyan-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Add Manual Lead</button>
          </div>
        )}
      </main>
    </div>
  );
}
