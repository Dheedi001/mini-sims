import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './authSlice';
import { 
  LayoutDashboard, Users, Receipt, Calendar, 
  Settings, LogOut, Bell, Search, Command, ChevronRight,
  TrendingUp, UserCheck, UserPlus, CreditCard, Scan, Menu, X
} from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getNavItems = () => {
    if (user?.role === 'admin') {
      return [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/students', icon: Users, label: 'Student Directory' },
        { path: '/admin/provision', icon: UserPlus, label: 'Provision Account' },
        { path: '/admin/fees', icon: Receipt, label: 'Fees & Finance' },
        { path: '/admin/analytics', icon: TrendingUp, label: 'AI Analytics' },
        { path: '/admin/timetable', icon: Calendar, label: 'Timetable' },
      ];
    } else if (user?.role === 'lecturer') {
      return [
        { path: '/lecturer/dashboard', icon: Scan, label: 'Live QR Session' },
        { path: '/lecturer/registry', icon: UserCheck, label: 'Manual Registry' },
      ];
    } else {
      return [
        { path: '/student/dashboard', icon: LayoutDashboard, label: 'My Dashboard' },
        { path: '/student/fees', icon: CreditCard, label: 'Tuition & Fees' },
        { path: '/student/timetable', icon: Calendar, label: 'My Classes' },
      ];
    }
  };

  const navItems = getNavItems();
  const userInitials = user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'A';
  const displayRole = user?.role ? user.role.toUpperCase() : 'ENTERPRISE';
  const displayName = user?.full_name || 'System Admin';

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile sidebar on click
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 xl:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* PREMIUM SIDEBAR */}
      <aside className={`
        fixed xl:static inset-y-0 left-0 z-50 w-[260px] bg-[#0B1121] text-slate-400 flex flex-col border-r border-slate-800/50 flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
      `}>
        <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-4 p-2 text-slate-400 hover:text-white xl:hidden z-20">
          <X size={20} />
        </button>

        <div className="absolute top-0 left-0 w-full h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>
        
        <div className="p-8 flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)]">S</div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">Mini-SIMS</h1>
            <p className="text-[10px] uppercase tracking-widest mt-1.5 text-blue-400 font-bold">{displayRole}</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1.5 relative z-10 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-4 mt-2">Workspace</p>
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            const Icon = item.icon;
            return (
              <button 
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${isActive ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
                  <span className="text-sm">{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50 relative z-10">
          <button onClick={() => handleNavigation(`/${user?.role || 'admin'}/settings`)} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl text-sm font-medium transition-colors">
            <Settings size={18} /> Settings
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl text-sm font-medium transition-colors mt-1">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 w-full relative">
        <header className="h-[76px] w-full glass-panel sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-3 flex-1 xl:w-96">
            
            {/* Hamburger Mobile Menu */}
            <button onClick={() => setMobileMenuOpen(true)} className="xl:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu size={24} />
            </button>

            {user?.role !== 'student' && (
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-100/50 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-all w-full max-w-xs group">
                <Search size={16} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm w-full font-medium text-slate-700" />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-slate-200">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-700 leading-none mb-1">{displayName}</p>
               </div>
               <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white shadow-md text-sm sm:text-base">
                 {userInitials}
               </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative w-full">
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
          <div className="relative z-10 p-4 sm:p-8 w-full max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}