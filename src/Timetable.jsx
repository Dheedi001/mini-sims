import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User as UserIcon, BookOpen } from 'lucide-react';

export default function Timetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [activeDay, setActiveDay] = useState('Wednesday');

  // Premium mock schedule data
  const schedule = [
    { 
      id: 1, 
      subject: 'Advanced React Patterns', 
      time: '09:00 AM - 10:30 AM', 
      teacher: 'Dr. Smith', 
      room: 'Lab 402', 
      type: 'Core', 
      color: 'blue' 
    },
    { 
      id: 2, 
      subject: 'System Design Architecture', 
      time: '11:00 AM - 12:30 PM', 
      teacher: 'Prof. Johnson', 
      room: 'Lecture Hall A', 
      type: 'Lecture', 
      color: 'indigo' 
    },
    { 
      id: 3, 
      subject: 'Database Modeling', 
      time: '01:30 PM - 03:00 PM', 
      teacher: 'Mrs. Davis', 
      room: 'Room 204', 
      type: 'Practical', 
      color: 'emerald' 
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Academic Timetable</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage class schedules, locations, and instructors.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)]">
          <Calendar size={16} /> Sync Calendar
        </button>
      </div>

      <div className="premium-card overflow-hidden max-w-5xl flex flex-col min-h-[600px]">
        {/* HORIZONTAL DAY SELECTOR */}
        <div className="px-8 py-5 border-b border-slate-100 bg-white/50 backdrop-blur-md">
          <div className="flex gap-4">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex-1 ${
                  activeDay === day 
                    ? 'bg-blue-50 text-blue-600 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        
        {/* TIMELINE CONTENT */}
        <div className="p-10 flex-1 bg-slate-50/30 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[88px] top-10 bottom-10 w-0.5 bg-slate-200/60 rounded-full"></div>

          <div className="space-y-8 relative z-10">
            {schedule.map((session, index) => (
              <div key={session.id} className="flex gap-8 group">
                
                {/* Time Column */}
                <div className="w-24 pt-4 text-right">
                  <p className="text-sm font-black text-slate-800 leading-none">{session.time.split(' - ')[0]}</p>
                  <p className="text-xs font-bold text-slate-400 mt-1">{session.time.split(' - ')[1]}</p>
                </div>

                {/* Timeline Dot */}
                <div className="relative mt-5">
                  <div className={`w-4 h-4 rounded-full bg-white border-4 border-${session.color}-500 shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:scale-125 transition-transform duration-300 relative z-10`}></div>
                </div>

                {/* Class Card */}
                <div className={`flex-1 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-${session.color}-200 relative overflow-hidden`}>
                  
                  {/* Subtle Background Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${session.color}-50 rounded-full blur-[40px] -mr-10 -mt-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-${session.color}-50 text-${session.color}-600 border border-${session.color}-100`}>
                          {session.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-800 tracking-tight">{session.subject}</h3>
                    </div>
                    
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                      <BookOpen size={18} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-6 border-t border-slate-50 pt-5 relative z-10">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <UserIcon size={16} className="text-slate-400" />
                      {session.teacher}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <MapPin size={16} className="text-slate-400" />
                      {session.room}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <Clock size={16} className="text-slate-400" />
                      1h 30m
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}