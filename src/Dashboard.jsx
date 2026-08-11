import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Users, TrendingUp, ShieldAlert, CreditCard, 
  CheckCircle2, AlertCircle, Clock
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const riskLedger = [
    { id: 1, name: 'Daniel O.', grade: 'Year 2', attendance: 85, fees: '₦50,000', status: 'pending', risk: 'Good' },
    { id: 2, name: 'Sarah J.', grade: 'Year 1', attendance: 98, fees: 'Cleared', status: 'cleared', risk: 'Good' },
    { id: 3, name: 'Michael B.', grade: 'Year 3', attendance: 60, fees: '₦120,000', status: 'pending', risk: 'Critical' },
    { id: 4, name: 'David E.', grade: 'Year 2', attendance: 72, fees: '₦85,000', status: 'pending', risk: 'Critical' },
  ];

  return (
    <div className="animate-fade-in w-full space-y-6 lg:space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[50px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight mb-1">Administrator Dashboard</h2>
          <p className="text-blue-100 text-sm font-medium">Welcome back, {user?.full_name || 'Admin'}. Here is today's campus overview.</p>
        </div>
        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-sm font-bold flex items-center gap-2 relative z-10">
          <Clock size={16} className="text-blue-200" /> Live Environment
        </div>
      </div>

      {/* TOP METRICS - Fixed grids to stack correctly on small screens (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="premium-card p-6 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Enrollment</p>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center"><Users size={20} /></div>
          </div>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-4">1,248</h3>
        </div>

        <div className="premium-card p-6 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Attendance</p>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><TrendingUp size={20} /></div>
          </div>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-4">86.4%</h3>
        </div>

        <div className="premium-card p-6 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Fees</p>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center"><CreditCard size={20} /></div>
          </div>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-4 truncate">₦12.5M</h3>
        </div>

        <div className="premium-card p-6 bg-[#0B1121] text-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Smart Alerts</p>
            <div className="w-10 h-10 rounded-xl bg-coral-500/20 text-coral-400 flex items-center justify-center"><ShieldAlert size={20} /></div>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <h3 className="text-3xl font-black tracking-tight">2</h3>
            <p className="text-xs font-bold text-coral-400 mb-1.5">Action Req.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        
        {/* RIGHT SIDE: STUDENT RISK LEDGER - Fixed for Mobile Crushing */}
        <div className="xl:col-span-2">
          <div className="premium-card bg-white h-full flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">Student Risk Ledger</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">Students requiring attention for fees or attendance.</p>
            </div>
            
            {/* THE RESPONSIVENESS MAGIC: overflow-x-auto & min-w */}
            <div className="p-6 overflow-x-auto custom-scrollbar">
              <div className="min-w-[650px] space-y-3">
                
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  <div>Student Profile</div>
                  <div>Attendance Metrics</div>
                  <div>Financial Status</div>
                  <div>Risk Assessment</div>
                </div>
                
                {/* Table Rows */}
                {riskLedger.map((student) => (
                  <div key={student.id} className="grid grid-cols-4 gap-4 p-4 rounded-2xl border border-slate-100 items-center hover:border-blue-100 hover:shadow-sm transition-all bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-700 shadow-sm">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{student.grade}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-700">{student.attendance}%</span>
                        <span className="text-[10px] font-bold text-slate-400">RATE</span>
                      </div>
                      <div className="w-16 h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                        <div className={`h-full rounded-full ${student.attendance < 75 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${student.attendance}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <h4 className={`text-sm font-black ${student.status === 'cleared' ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {student.fees}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{student.status}</p>
                    </div>

                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${student.risk === 'Critical' ? 'bg-coral-50 text-coral-600 border border-coral-200/50' : 'bg-emerald-50 text-emerald-600 border border-emerald-200/50'}`}>
                        {student.risk === 'Critical' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />} {student.risk}
                      </span>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}