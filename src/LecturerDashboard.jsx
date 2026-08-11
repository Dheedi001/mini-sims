import React, { useState, useEffect } from 'react';
import { QrCode, Users, Scan, Clock, CheckCircle2, ChevronDown, StopCircle } from 'lucide-react';

export default function LecturerDashboard() {
  const [sessionActive, setSessionActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [scannedCount, setScannedCount] = useState(0);

  // Mock Lecturer Data
  const courses = [
    { id: 'c1', title: 'Advanced React Patterns (SEN 301)' },
    { id: 'c2', title: 'System Architecture (SEN 402)' }
  ];

  useEffect(() => {
    let timer;
    if (sessionActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        // Simulate random students scanning the QR code
        if (Math.random() > 0.7) setScannedCount(prev => prev + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setSessionActive(false);
    }
    return () => clearInterval(timer);
  }, [sessionActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startSession = () => {
    setSessionActive(true);
    setTimeLeft(300);
    setScannedCount(0);
  };

  const endSession = () => {
    setSessionActive(false);
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Lecturer Workspace</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage course sessions and track live student attendance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="lg:col-span-1 space-y-6">
          <div className="premium-card p-6 bg-white">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Scan size={18} className="text-blue-500" /> Session Configuration
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Course</label>
                <div className="relative">
                  <select 
                    disabled={sessionActive}
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700 appearance-none disabled:opacity-50"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {!sessionActive ? (
                <button 
                  onClick={startSession}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] flex items-center justify-center gap-2 active:scale-95"
                >
                  <QrCode size={18} /> Generate QR Token
                </button>
              ) : (
                <button 
                  onClick={endSession}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)] flex items-center justify-center gap-2 active:scale-95"
                >
                  <StopCircle size={18} /> End Active Session
                </button>
              )}
            </div>
          </div>

          <div className="premium-card p-6 bg-white flex items-center justify-between">
             <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Live Scans</p>
                <h3 className="text-3xl font-black text-slate-800">{scannedCount}</h3>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
               <Users size={24} />
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE QR DISPLAY */}
        <div className="lg:col-span-2">
          <div className="h-[500px] bg-[#0B1121] rounded-[32px] border border-slate-800 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center relative overflow-hidden group">
            
            {/* Ambient Background Glows */}
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-indigo-900/10 transition-opacity duration-1000 ${sessionActive ? 'opacity-100' : 'opacity-0'}`}></div>
            
            {sessionActive ? (
              <div className="relative z-10 flex flex-col items-center animate-slide-up">
                {/* Live Indicator */}
                <div className="absolute -top-12 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Session Live
                </div>
                
                {/* The QR Code Container */}
                <div className="bg-white p-6 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)] relative">
                  {/* Decorative Scan Line Animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-[slideUp_2s_ease-in-out_infinite_alternate] rounded-full opacity-50 z-20"></div>
                  
                  {/* For presentation purposes, using a heavily styled Lucide icon to simulate the QR. 
                      In production, replace with <QRCode value={databaseToken} /> */}
                  <QrCode size={200} className="text-slate-900" strokeWidth={1} />
                </div>

                {/* Countdown Timer */}
                <div className="mt-8 flex items-center gap-3 text-white">
                  <Clock size={20} className="text-blue-400" />
                  <span className="text-3xl font-black font-mono tracking-wider">{formatTime(timeLeft)}</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mt-2">Students must scan before timer expires.</p>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center text-slate-500">
                <QrCode size={80} strokeWidth={1} className="opacity-20 mb-6" />
                <h3 className="text-xl font-black text-slate-400">No Active Session</h3>
                <p className="text-sm font-medium mt-2 max-w-xs text-center">Select a course and click generate to display the attendance QR code.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}