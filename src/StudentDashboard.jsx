import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Scan, Clock, BookOpen, Calendar, CheckCircle2, AlertCircle, Receipt, Loader2 } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Mock Student Data
  const studentMetrics = {
    attendance: 88,
    feesBalance: 50000,
    nextClass: 'System Architecture (SEN 402)',
    time: '11:00 AM'
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanSuccess(false);
    
    // Simulate camera activation and network request
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
    }, 2000);
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      
      {/* PERSONALIZED WELCOME BANNER */}
      <div className="mb-8 p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-[0_10px_30px_rgba(59,130,246,0.3)] relative overflow-hidden flex justify-between items-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[50px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight">Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}!</h2>
          <p className="text-blue-100 mt-1 font-medium">Software Engineering • {user?.regNo || '202600142'}</p>
        </div>
        <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center font-black text-2xl shadow-inner relative z-10">
          {user?.full_name?.charAt(0) || 'S'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* METRIC: ATTENDANCE */}
        <div className="premium-card p-6 flex flex-col justify-between group hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-slate-400">My Attendance</p>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform"><CheckCircle2 size={20} /></div>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">{studentMetrics.attendance}%</h3>
            <p className="text-xs font-bold text-emerald-500 mb-1.5">+2% this week</p>
          </div>
        </div>

        {/* METRIC: NEXT CLASS */}
        <div className="premium-card p-6 flex flex-col justify-between group hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-slate-400">Up Next</p>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Clock size={20} /></div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-black text-slate-800 tracking-tight truncate">{studentMetrics.nextClass}</h3>
            <p className="text-sm font-bold text-blue-500 mt-0.5">{studentMetrics.time}</p>
          </div>
        </div>

        {/* METRIC: FEES */}
        <div className="premium-card p-6 flex flex-col justify-between group hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-slate-400">Pending Fees</p>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Receipt size={20} /></div>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">₦{studentMetrics.feesBalance.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ACTION: SCAN ATTENDANCE */}
        <div className="premium-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 mb-6 shadow-sm">
            <Scan size={32} />
          </div>
          
          <h3 className="text-xl font-black text-slate-800 mb-2">Class Attendance</h3>
          <p className="text-sm font-medium text-slate-500 mb-8 max-w-xs">
            Scan the QR code projected by your lecturer to log your presence for the current session.
          </p>
          
          <button 
            onClick={handleScan}
            disabled={isScanning || scanSuccess}
            className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 ${
              scanSuccess 
                ? 'bg-emerald-500 text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.39)]' 
                : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg'
            }`}
          >
            {isScanning ? (
              <><Loader2 size={18} className="animate-spin" /> Connecting to Camera...</>
            ) : scanSuccess ? (
              <><CheckCircle2 size={18} /> Attendance Logged</>
            ) : (
              <><Scan size={18} /> Scan Lecturer QR</>
            )}
          </button>
        </div>

        {/* LIST: TODAY's SCHEDULE */}
        <div className="premium-card p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-slate-400" /> Today's Schedule
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all group flex gap-4">
              <div className="w-12 pt-1 text-center">
                <p className="text-xs font-black text-slate-800">09:00</p>
                <p className="text-[10px] font-bold text-slate-400">AM</p>
              </div>
              <div className="w-1 bg-emerald-500 rounded-full"></div>
              <div>
                <h4 className="font-bold text-slate-800">Advanced React Patterns</h4>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1"><BookOpen size={12}/> Dr. Smith • Lab 402</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/30 hover:shadow-sm transition-all group flex gap-4">
              <div className="w-12 pt-1 text-center">
                <p className="text-xs font-black text-blue-600">11:00</p>
                <p className="text-[10px] font-bold text-blue-400">AM</p>
              </div>
              <div className="w-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
              <div>
                <h4 className="font-bold text-slate-800">System Architecture</h4>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1"><BookOpen size={12}/> Prof. Johnson • Lecture Hall A</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}