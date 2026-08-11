import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from './studentSlice';
import { Search, Filter, Mail, ShieldAlert, CheckCircle2, User, ChevronRight, GraduationCap } from 'lucide-react';

export default function StudentDirectory() {
  const dispatch = useDispatch();
  const { data: students, status } = useSelector((state) => state.students);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (student.regNo && student.regNo.includes(searchTerm));
    const matchesDept = departmentFilter === 'All' || student.grade === departmentFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Student Directory</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Master institutional registry and student profiles.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or reg no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 w-72 shadow-sm"
            />
          </div>
          <select 
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 shadow-sm cursor-pointer"
          >
            <option value="All">All Levels / Grades</option>
            <option value="Year 1">Year 1</option>
            <option value="Year 2">Year 2</option>
            <option value="Year 3">Year 3</option>
          </select>
        </div>
      </div>

      <div className="premium-card overflow-hidden bg-white">
        <div className="grid grid-cols-5 gap-4 px-8 py-4 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="col-span-2">Student & Institutional Email</div>
          <div>Department</div>
          <div>Attendance</div>
          <div className="text-right">Action</div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredStudents.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-bold">No students match your search criteria.</div>
          ) : (
            filteredStudents.map((student) => (
              <div key={student.id} className="grid grid-cols-5 gap-4 px-8 py-5 items-center hover:bg-slate-50/80 transition-colors group">
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-700 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">{student.regNo || `202600${student.id}@sims.edu.ng`}</p>
                  </div>
                </div>
                
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                    <GraduationCap size={14} className="text-slate-400" /> {student.grade || 'Software Engineering'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">{student.attendanceRate}%</span>
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${student.attendanceRate < 75 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${student.attendanceRate}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="px-3.5 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-sm">
                    View Profile <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}