import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, ShieldAlert, Activity, DollarSign, BrainCircuit, Sparkles } from 'lucide-react';

export default function Analytics() {
  const revenueData = [
    { month: 'Jan', revenue: 4200000 },
    { month: 'Feb', revenue: 5800000 },
    { month: 'Mar', revenue: 7100000 },
    { month: 'Apr', revenue: 6500000 },
    { month: 'May', revenue: 9200000 },
    { month: 'Jun', revenue: 11400000 },
  ];

  const attendanceTrend = [
    { week: 'W1', rate: 91 },
    { week: 'W2', rate: 88 },
    { week: 'W3', rate: 94 },
    { week: 'W4', rate: 89 },
    { week: 'W5', rate: 95 },
  ];

  return (
    <div className="animate-fade-in max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">AI Analytics & Intelligence</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Predictive campus modeling and financial telemetry.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-xl text-xs font-bold">
          <BrainCircuit size={16} /> AI Engine Active
        </div>
      </div>

      {/* TOP METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="premium-card p-6 bg-white">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fee Collection Velocity</p>
          <div className="flex items-baseline justify-between mt-4">
            <h3 className="text-3xl font-black text-slate-800">+24.8%</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">vs last semester</span>
          </div>
        </div>
        <div className="premium-card p-6 bg-white">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Campus Retention Rate</p>
          <div className="flex items-baseline justify-between mt-4">
            <h3 className="text-3xl font-black text-slate-800">96.4%</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">Stable</span>
          </div>
        </div>
        <div className="premium-card p-6 bg-gradient-to-br from-slate-900 to-[#0B1121] text-white">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">AI Risk Predictor</p>
          <div className="flex items-baseline justify-between mt-4">
            <h3 className="text-3xl font-black text-white">4 Students</h3>
            <span className="text-xs font-bold text-coral-400 bg-coral-500/20 px-2.5 py-1 rounded-lg">Action Required</span>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* REVENUE AREA CHART */}
        <div className="premium-card p-8 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Tuition Revenue Trend (₦)</h3>
            <span className="text-xs font-bold text-slate-400 uppercase">H1 2026</span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(v) => `₦${v/1000000}M`} />
                <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ATTENDANCE BAR CHART */}
        <div className="premium-card p-8 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Weekly Attendance Average (%)</h3>
            <span className="text-xs font-bold text-slate-400 uppercase">Real-time</span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceTrend}>
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="rate" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* AI RECOMMENDATIONS BANNER */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-xl relative overflow-hidden flex items-center justify-between">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-blue-300 mb-3 backdrop-blur-md">
            <Sparkles size={14} /> AI Recommendation Engine
          </div>
          <h3 className="text-xl font-bold tracking-tight">Automated Fee Reminders Triggered</h3>
          <p className="text-slate-300 text-sm mt-1 leading-relaxed">
            The neural risk model detected 2 students with pending balances exceeding ₦100,000 whose attendance has dropped below 75%. Automated WhatsApp and institutional email notices have been scheduled for tomorrow at 08:00 AM.
          </p>
        </div>
      </div>
    </div>
  );
}