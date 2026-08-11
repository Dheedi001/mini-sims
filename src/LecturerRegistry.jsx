import React, { useState } from 'react';
import { Users, Check, X, Clock, Search, Filter } from 'lucide-react';

export default function LecturerRegistry() {
  const [activeCourse, setActiveCourse] = useState('SEN 301');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Local state to track toggled attendance
  const [registryState, setRegistryState] = useState({});

  // Mock roster specific to the lecturer's assigned course
  const courseRoster = [
    { id: '1', name: 'John Doe', regNo: '202600142', attendanceRate: 88 },
    { id: '2', name: 'Sarah Jenkins', regNo: '202600143', attendanceRate: 95 },
    { id: '3', name: 'Michael Bassey', regNo: '202600144', attendanceRate: 72 },
    { id: '4', name: 'David Etim', regNo: '202600145', attendanceRate: 60 },
  ];

  const markStatus = (studentId, statusType) => {
    setRegistryState(prev => ({
      ...prev,
      [studentId]: statusType
    }));
  };

  const filteredRoster = courseRoster.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.regNo.includes(searchTerm)
  );

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Manual Registry</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manually tick attendance for students without devices.</p>
        </div>
        <select 
          value={activeCourse}
          onChange={(e) => setActiveCourse(e.target.value)}
          className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-blue-600 outline-none focus:border-blue-500 shadow-sm cursor-pointer"
        >
          <option value="SEN 301">Advanced React Patterns (SEN 301)</option>
          <option value="SEN 402">System Architecture (SEN 402)</option>
        </select>
      </div>

      <div className="premium-card overflow-hidden bg-white">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search roster..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-500 w-64 shadow-sm"
            />
          </div>
          <button className="text-xs font-bold px-4 py-2 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 transition-colors">
            Submit Registry to DB
          </button>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 mb-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="col-span-2">Student Profile</div>
            <div>Current Rate</div>
            <div className="text-right">Tick Status</div>
          </div>
          
          <div className="space-y-3">
            {filteredRoster.map((student) => {
              const currentStatus = registryState[student.id];

              return (
                <div key={student.id} className="grid grid-cols-4 gap-4 p-4 rounded-2xl border border-slate-100 items-center hover:shadow-md hover:border-blue-100 transition-all duration-300">
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-600">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{student.name}</p>
                      <p className="text-[11px] font-mono text-slate-500 mt-0.5">{student.regNo}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className={`text-sm font-black ${student.attendanceRate < 75 ? 'text-coral-500' : 'text-slate-700'}`}>
                      {student.attendanceRate}%
                    </span>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => markStatus(student.id, 'present')}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${currentStatus === 'present' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 border border-slate-100'}`}
                    >
                      <Check size={16} strokeWidth={currentStatus === 'present' ? 3 : 2} />
                    </button>
                    <button 
                      onClick={() => markStatus(student.id, 'late')}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${currentStatus === 'late' ? 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-500 border border-slate-100'}`}
                    >
                      <Clock size={16} strokeWidth={currentStatus === 'late' ? 3 : 2} />
                    </button>
                    <button 
                      onClick={() => markStatus(student.id, 'absent')}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 ${currentStatus === 'absent' ? 'bg-coral-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-slate-50 text-slate-400 hover:bg-coral-50 hover:text-coral-500 border border-slate-100'}`}
                    >
                      <X size={16} strokeWidth={currentStatus === 'absent' ? 3 : 2} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}