import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './authSlice';
import { 
  LayoutDashboard, Users, Receipt, Calendar, 
  Settings, LogOut, Bell, Search, Command, ChevronRight 
} from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/attendance', icon: Users, label: 'Attendance' },
    { path: '/fees', icon: Receipt, label: 'Fees & Finance' },
    { path: '/timetable', icon: Calendar, label: 'Timetable' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* PREMIUM SIDEBAR */}
      <aside className="w-[260px] bg-[#0B1121] text-slate-400 flex flex-col z-20 border-r border-slate-800/50 flex-shrink-0 relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-full h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>
        
        <div className="p-8 flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400/20">
            S
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">Mini-SIMS</h1>
            <p className="text-[10px] uppercase tracking-widest mt-1.5 text-blue-400 font-bold">Enterprise</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1.5 relative z-10 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-4 mt-2">Main Menu</p>
          
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            const Icon = item.icon;
            
            return (
              <button 
                key={item.path}
                onClick={() => !item.disabled && navigate(item.path)}
                disabled={item.disabled}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 group
                  ${isActive 
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}
                  ${item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
                  {item.label}
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>}
                {!isActive && !item.disabled && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50 relative z-10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl font-medium transition-colors">
            <Settings size={18} /> Settings
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl font-medium transition-colors mt-1">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* GLASSMORPHIC HEADER */}
        <header className="h-[76px] glass-panel sticky top-0 z-30 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 w-96">
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-100/50 hover:bg-slate-100 border border-slate-200/60 rounded-xl focus-within:border-blue-500/40 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] transition-all w-full cursor-text group">
              <Search size={16} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search students, invoices..." 
                className="bg-transparent outline-none text-sm w-full font-medium text-slate-700 placeholder:text-slate-400" 
              />
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded-md bg-slate-200/50 border border-slate-200">
                <Command size={10} /> K
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-full hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
               <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-slate-700 leading-none mb-1">Destiny E.</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{user?.username || 'Administrator'}</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center font-bold text-white shadow-md border border-slate-700 hover:scale-105 transition-transform cursor-pointer">
                 DE
               </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC PAGE RENDERER */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
          <div className="relative z-10 p-8 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}