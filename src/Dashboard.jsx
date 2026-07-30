import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from './studentSlice';
import { Users, Activity, DollarSign, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data: students, status } = useSelector((state) => state.students);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const calculateRiskScore = (student) => {
    let score = 0;
    if (student.attendanceRate < 75) score += 50;
    else if (student.attendanceRate < 85) score += 20;
    if (student.feesBalance > 100000) score += 50;
    else if (student.feesBalance > 50000) score += 25;

    if (score >= 75) return { tier: 'Critical', color: 'bg-red-500/10 text-red-600 border-red-500/20', dot: 'bg-red-500', flag: true };
    if (score >= 45) return { tier: 'Warning', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20', dot: 'bg-amber-500', flag: true };
    return { tier: 'Good', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', dot: 'bg-emerald-500', flag: false };
  };

  const totalStudents = students.length;
  const avgAttendance = totalStudents ? Math.round(students.reduce((acc, curr) => acc + curr.attendanceRate, 0) / totalStudents) : 0;
  const totalFees = students.reduce((acc, curr) => acc + curr.feesBalance, 0).toLocaleString();
  const atRiskCount = students.filter(s => calculateRiskScore(s).flag).length;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">System Overview</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Live metrics and structural campus data.</p>
      </div>

      {status === 'loading' && (
         <div className="animate-pulse space-y-8">
           <div className="grid grid-cols-4 gap-6"><div className="h-32 bg-white rounded-3xl border border-slate-100"></div><div className="h-32 bg-white rounded-3xl border border-slate-100"></div><div className="h-32 bg-white rounded-3xl border border-slate-100"></div><div className="h-32 bg-white rounded-3xl border border-slate-100"></div></div>
         </div>
      )}

      {status === 'succeeded' && (
        <>
          {/* PREMIUM METRIC CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="premium-card p-6 flex flex-col justify-between group hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-400">Total Enrolled</p>
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><Users size={20} /></div>
              </div>
              <h3 className="text-4xl font-black text-slate-800 mt-4 tracking-tight">{totalStudents}</h3>
            </div>

            <div className="premium-card p-6 flex flex-col justify-between group hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-400">Avg Attendance</p>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><Activity size={20} /></div>
              </div>
              <h3 className="text-4xl font-black text-slate-800 mt-4 tracking-tight">{avgAttendance}%</h3>
            </div>

            <div className="premium-card p-6 flex flex-col justify-between group hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-400">Outstanding Fees</p>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><DollarSign size={20} /></div>
              </div>
              <h3 className="text-4xl font-black text-slate-800 mt-4 tracking-tight">₦{totalFees}</h3>
            </div>

            <div className="premium-card p-6 border-0 bg-gradient-to-br from-navy-800 to-navy-900 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500"><AlertCircle size={120} className="text-coral-500" /></div>
              <div className="flex justify-between items-start relative z-10">
                <p className="text-sm font-bold text-slate-300">Smart Alerts</p>
                <div className="w-10 h-10 rounded-xl bg-coral-500/20 text-coral-400 flex items-center justify-center border border-coral-500/30"><AlertCircle size={20} /></div>
              </div>
              <div className="relative z-10 mt-4 flex items-end gap-2">
                <h3 className="text-4xl font-black text-white tracking-tight">{atRiskCount}</h3>
                <p className="text-sm font-bold text-coral-400 mb-1.5">Action Req.</p>
              </div>
            </div>
          </div>

          {/* DATA TABLE AREA */}
          <div className="premium-card overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
              <h3 className="font-bold text-slate-800 text-lg">Student Risk Ledger</h3>
            </div>
            
            <div className="p-8">
              {students.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <Users size={48} className="opacity-20 mb-4" />
                  <p className="font-bold">No student records found in database.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-4 mb-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div>Student Profile</div>
                    <div>Attendance Metrics</div>
                    <div>Financial Status</div>
                    <div className="text-right">Risk Assessment</div>
                  </div>
                  
                  <div className="space-y-3">
                    {students.map((student) => {
                      const risk = calculateRiskScore(student);
                      return (
                        <div key={student.id} className="grid grid-cols-4 gap-4 p-5 rounded-2xl border border-slate-100 bg-white items-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-[1.01] hover:border-primary-100 transition-all duration-300 cursor-pointer group">
                          
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-600 shadow-sm group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-sm leading-tight">{student.name}</p>
                              <p className="text-[11px] font-medium text-slate-500 mt-0.5">{student.grade}</p>
                            </div>
                          </div>
                          
                          <div className="pr-8">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold text-slate-700">{student.attendanceRate}%</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Rate</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${student.attendanceRate < 75 ? 'bg-coral-500' : student.attendanceRate < 85 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${student.attendanceRate}%` }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className={`text-sm font-black ${student.feesBalance > 0 ? 'text-slate-800' : 'text-emerald-500'}`}>
                              {student.feesBalance > 0 ? `₦${student.feesBalance.toLocaleString()}` : 'Cleared'}
                            </div>
                            {student.feesBalance > 0 && <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Pending</p>}
                          </div>

                          <div className="flex justify-end">
                            <span className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 border rounded-lg font-bold tracking-wide ${risk.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`}></span>
                              {risk.tier}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}