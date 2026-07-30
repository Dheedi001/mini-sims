import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from './studentSlice';
import { UserCheck, Check, X, Clock, Calendar as CalendarIcon, Filter } from 'lucide-react';

export default function Attendance() {
  const dispatch = useDispatch();
  const { data: students, status } = useSelector((state) => state.students);
  
  // Local state to simulate marking attendance for today
  const [attendanceState, setAttendanceState] = useState({});

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const markStatus = (studentId, statusType) => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: statusType
    }));
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Daily Attendance</h2>
          <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
            <CalendarIcon size={14} /> {currentDate}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-saas-sm">
          <Filter size={14} /> Filter by Grade
        </button>
      </div>

      <div className="premium-card overflow-hidden max-w-5xl">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <UserCheck size={20} className="text-slate-400" /> Live Register
          </h3>
          <div className="flex gap-2">
            <button className="text-xs font-bold px-3 py-1.5 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200/50">
              Mark All Present
            </button>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 mb-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="col-span-2">Student Profile</div>
            <div>Current Rate</div>
            <div className="text-right">Today's Status</div>
          </div>
          
          <div className="space-y-3">
            {status === 'loading' && (
              <div className="p-4 text-sm font-bold text-blue-500 animate-pulse text-center">Loading registry...</div>
            )}
            
            {students.map((student) => {
              const currentStatus = attendanceState[student.id];

              return (
                <div key={student.id} className="grid grid-cols-4 gap-4 p-4 rounded-2xl border border-slate-100 bg-white items-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-[1.01] hover:border-blue-100 transition-all duration-300 group">
                  
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-600 shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm leading-tight">{student.name}</p>
                      <p className="text-[11px] font-medium text-slate-500 mt-0.5">{student.grade}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-black text-slate-700">{student.attendanceRate}%</span>
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