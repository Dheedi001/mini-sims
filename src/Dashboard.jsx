import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudents } from './studentSlice';
import { 
  Users, TrendingUp, ShieldAlert, CreditCard, 
  CheckCircle2, AlertCircle, Clock, AlertTriangle
} from 'lucide-react';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  // 1. Pull LIVE data from Supabase via Redux
  const { data: students, status } = useSelector((state) => state.students);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  // 2. RULE-BASED RISK SCORING ALGORITHM
  const calculateRiskScore = (attendance, feesStatus) => {
    let riskScore = 0;
    
    // Weight 1: Attendance (Below 75% is a major red flag)
    if (attendance < 75) riskScore += 60;
    else if (attendance < 85) riskScore += 20;

    // Weight 2: Fee Status
    if (feesStatus === 'pending') riskScore += 40;

    // Render Risk Tiers based on Weighted Score
    if (riskScore >= 60) return { label: 'Critical', color: 'text-coral-600', bg: 'bg-coral-50', border: 'border-coral-200/50', icon: AlertCircle };
    if (riskScore >= 40) return { label: 'Warning', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200/50', icon: AlertTriangle };
    return { label: 'Good', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200/50', icon: CheckCircle2 };
  };

  // 3. Process the live data through the scoring engine
  const processedLedger = useMemo(() => {
    return students.map(student => ({
      ...student,
      riskProfile: calculateRiskScore(student.attendanceRate, student.feesStatus)
    })).sort((a, b) => {
      // Sort so 'Critical' students show up at the top of the ledger
      const riskWeight = { 'Critical': 3, 'Warning': 2, 'Good': 1 };
      return riskWeight[b.riskProfile.label] - riskWeight[a.riskProfile.label];
    });
  }, [students]);

  // Calculate dynamic dashboard stats
  const totalStudents = students.length;
  const avgAttendance = totalStudents > 0 
    ? (students.reduce((acc, curr) => acc + curr.attendanceRate, 0) / totalStudents).toFixed(1) 
    : 0;
  const criticalAlerts = processedLedger.filter(s => s.riskProfile.label === 'Critical').length;

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

      {/* TOP METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="premium-card p-6 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Enrollment</p>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center"><Users size={20} /></div>
          </div>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-4">{totalStudents}</h3>
        </div>

        <div className="premium-card p-6 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Attendance</p>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"><TrendingUp size={20} /></div>
          </div>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-4">{avgAttendance}%</h3>
        </div>

        <div className="premium-card p-6 bg-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Fees</p>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center"><CreditCard size={20} /></div>
          </div>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-4 truncate">Active</h3>
        </div>

        {/* Dynamic Smart Alerts Metric */}
        <div className="premium-card p-6 bg-[#0B1121] text-white flex flex-col justify-between shadow-[0_10px_30px_rgba(239,68,68,0.15)]">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Smart Alerts</p>
            <div className="w-10 h-10 rounded-xl bg-coral-500/20 text-coral-400 flex items-center justify-center"><ShieldAlert size={20} /></div>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <h3 className="text-3xl font-black tracking-tight">{criticalAlerts}</h3>
            <p className="text-xs font-bold text-coral-400 mb-1.5">Action Req.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        
        {/* RIGHT SIDE: LIVE DYNAMIC STUDENT RISK LEDGER */}
        <div className="xl:col-span-2">
          <div className="premium-card bg-white h-full flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">Student Risk Ledger (Rule-Based Engine)</h3>
              <p className="text-xs font-medium text-slate-500 mt-1">Dynamically tracking live attendance & financial metrics.</p>
            </div>
            
            <div className="p-6 overflow-x-auto custom-scrollbar">
              <div className="min-w-[650px] space-y-3">
                
                <div className="grid grid-cols-4 gap-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  <div>Student Profile</div>
                  <div>Attendance Metrics</div>
                  <div>Financial Status</div>
                  <div>Risk Assessment</div>
                </div>
                
                {status === 'loading' ? (
                  <div className="p-8 text-center text-slate-400 font-bold animate-pulse">Running Risk Assessment Engine...</div>
                ) : processedLedger.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 font-bold">No students found in database.</div>
                ) : (
                  processedLedger.map((student) => {
                    const RiskIcon = student.riskProfile.icon;
                    
                    return (
                      <div key={student.id} className="grid grid-cols-4 gap-4 p-4 rounded-2xl border border-slate-100 items-center hover:border-blue-100 hover:shadow-sm transition-all bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-700 shadow-sm">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm truncate max-w-[120px]">{student.name}</h4>
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">{student.grade}</p>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-700">{student.attendanceRate}%</span>
                            <span className="text-[10px] font-bold text-slate-400">RATE</span>
                          </div>
                          <div className="w-16 h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                            <div className={`h-full rounded-full ${student.attendanceRate < 75 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${student.attendanceRate}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <h4 className={`text-sm font-black uppercase ${student.feesStatus === 'cleared' ? 'text-emerald-600' : 'text-slate-800'}`}>
                            {student.feesStatus}
                          </h4>
                          <p className="text-[10px] font-bold text-slate-400 mt-0.5">STATUS</p>
                        </div>

                        <div>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${student.riskProfile.bg} ${student.riskProfile.color} border ${student.riskProfile.border}`}>
                            <RiskIcon size={14} /> {student.riskProfile.label}
                          </span>
                        </div>
                      </div>
                    )
                  })
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}