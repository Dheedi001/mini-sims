import React, { useState } from 'react';
import { Search, Save, CheckCircle2, FileEdit, Calculator } from 'lucide-react';

export default function LecturerGrades() {
  const [activeCourse, setActiveCourse] = useState('SEN 301');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Initial mock data state for grading
  const [grades, setGrades] = useState([
    { id: '1', name: 'Daniel O.', regNo: '202600142', ca: '', exam: '' },
    { id: '2', name: 'Sarah J.', regNo: '202600143', ca: '', exam: '' },
    { id: '3', name: 'Michael B.', regNo: '202600144', ca: '', exam: '' },
    { id: '4', name: 'David E.', regNo: '202600145', ca: '', exam: '' },
  ]);

  const calculateGrade = (ca, exam) => {
    const total = (Number(ca) || 0) + (Number(exam) || 0);
    if (total >= 70) return { score: total, letter: 'A', color: 'text-emerald-500' };
    if (total >= 60) return { score: total, letter: 'B', color: 'text-blue-500' };
    if (total >= 50) return { score: total, letter: 'C', color: 'text-amber-500' };
    if (total >= 45) return { score: total, letter: 'D', color: 'text-orange-500' };
    return { score: total, letter: 'F', color: 'text-coral-500' };
  };

  const handleGradeChange = (id, field, value) => {
    // Ensure value is between 0 and max (CA max 30, Exam max 70)
    let numValue = parseInt(value, 10);
    if (isNaN(numValue)) numValue = '';
    else if (field === 'ca' && numValue > 30) numValue = 30;
    else if (field === 'exam' && numValue > 70) numValue = 70;

    setGrades(grades.map(g => g.id === id ? { ...g, [field]: numValue } : g));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  const filteredGrades = grades.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.regNo.includes(searchTerm)
  );

  return (
    <div className="animate-fade-in w-full max-w-5xl mx-auto space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">Grade Entry</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Input CA and Exam scores for your active courses.</p>
        </div>
        <select 
          value={activeCourse}
          onChange={(e) => setActiveCourse(e.target.value)}
          className="w-full sm:w-auto px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-blue-600 outline-none focus:border-blue-500 shadow-sm cursor-pointer"
        >
          <option value="SEN 301">Advanced React Patterns (SEN 301)</option>
          <option value="SEN 402">System Architecture (SEN 402)</option>
        </select>
      </div>

      <div className="premium-card overflow-hidden bg-white flex flex-col">
        <div className="px-4 lg:px-8 py-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search roster..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="text-sm font-bold px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSaving ? <Calculator size={16} className="animate-pulse" /> : (saved ? <CheckCircle2 size={16} /> : <Save size={16} />)}
            {isSaving ? 'Calculating...' : (saved ? 'Grades Saved' : 'Save to Master Ledger')}
          </button>
        </div>
        
        {/* MOBILE RESPONSIVE WRAPPER */}
        <div className="p-4 lg:p-8 overflow-x-auto custom-scrollbar">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-5 gap-4 mb-3 px-4 lg:px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="col-span-2">Student Profile</div>
              <div>CA (30%)</div>
              <div>Exam (70%)</div>
              <div className="text-right">Final Grade</div>
            </div>
            
            <div className="space-y-3">
              {filteredGrades.map((student) => {
                const result = calculateGrade(student.ca, student.exam);

                return (
                  <div key={student.id} className="grid grid-cols-5 gap-4 p-4 rounded-2xl border border-slate-100 items-center hover:shadow-md hover:border-blue-100 transition-all duration-300">
                    <div className="col-span-2 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-600 flex-shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{student.name}</p>
                        <p className="text-[11px] font-mono text-slate-500 mt-0.5">{student.regNo}</p>
                      </div>
                    </div>
                    
                    <div>
                      <input 
                        type="number"
                        placeholder="0-30"
                        value={student.ca}
                        onChange={(e) => handleGradeChange(student.id, 'ca', e.target.value)}
                        className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-center outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <input 
                        type="number"
                        placeholder="0-70"
                        value={student.exam}
                        onChange={(e) => handleGradeChange(student.id, 'exam', e.target.value)}
                        className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-center outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                    
                    <div className="flex flex-col items-end justify-center">
                      <span className={`text-xl font-black ${result.color}`}>
                        {result.letter}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                        {result.score}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}