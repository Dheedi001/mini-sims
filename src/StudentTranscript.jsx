import React from 'react';
import { useSelector } from 'react-redux';
import { Download, Award, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';

export default function StudentTranscript() {
  const { user } = useSelector((state) => state.auth);

  const transcriptData = [
    { code: 'SEN 301', title: 'Advanced React Patterns', credit: 3, grade: 'A', score: 85 },
    { code: 'SEN 303', title: 'Software Engineering Principles', credit: 3, grade: 'B', score: 68 },
    { code: 'SEN 305', title: 'Database Architecture', credit: 2, grade: 'A', score: 72 },
    { code: 'MTH 301', title: 'Engineering Mathematics', credit: 3, grade: 'C', score: 55 },
  ];

  return (
    <div className="animate-fade-in w-full max-w-5xl mx-auto space-y-6 lg:space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">Academic Transcript</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">First Semester, 2025/2026 Academic Session.</p>
        </div>
        <button className="text-sm font-bold px-5 py-2.5 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200/50 transition-colors flex items-center gap-2">
          <Download size={16} /> Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="premium-card p-6 bg-gradient-to-br from-slate-900 to-[#0B1121] text-white">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5"><Award size={14}/> Current CGPA</p>
          <h3 className="text-4xl font-black tracking-tight mt-3">4.25</h3>
          <p className="text-xs font-medium text-slate-400 mt-1">First Class Honors Track</p>
        </div>
        
        <div className="premium-card p-6 bg-white border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><BookOpen size={14}/> Total Credits</p>
          <h3 className="text-4xl font-black text-slate-800 tracking-tight mt-3">11</h3>
          <p className="text-xs font-medium text-slate-500 mt-1">Completed this semester</p>
        </div>

        <div className="premium-card p-6 bg-white border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><GraduationCap size={14}/> Academic Standing</p>
          <h3 className="text-2xl font-black text-emerald-500 tracking-tight mt-3 mb-1">In Good Standing</h3>
          <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">Cleared</span>
        </div>
      </div>

      <div className="premium-card bg-white overflow-hidden">
        <div className="p-6 lg:p-8 overflow-x-auto custom-scrollbar">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-6 gap-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-4">
              <div className="col-span-1">Course Code</div>
              <div className="col-span-3">Course Title</div>
              <div className="col-span-1 text-center">Credit Unit</div>
              <div className="col-span-1 text-right">Grade</div>
            </div>
            
            <div className="space-y-2">
              {transcriptData.map((course, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors items-center group">
                  <div className="col-span-1 font-bold text-sm text-blue-600">{course.code}</div>
                  <div className="col-span-3 font-medium text-sm text-slate-700">{course.title}</div>
                  <div className="col-span-1 text-center font-bold text-sm text-slate-500">{course.credit}</div>
                  <div className="col-span-1 text-right flex items-center justify-end gap-3">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-slate-500 transition-colors">{course.score}%</span>
                    <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {course.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}