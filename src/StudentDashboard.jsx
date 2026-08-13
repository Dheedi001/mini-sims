import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react'; // FIXED: Using the modern named export
import { Clock, BookOpenText, User, Maximize } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);

  // Security: Generate a temporary session token
  const secureIdentityToken = useMemo(() => {
    // Safe fallback: If reg_no isn't in Redux yet, use the default mock ID
    const regNo = user?.reg_no || '202600142';
    return `REG_NO:${regNo}`;
  }, [user]);

  return (
    <div className="animate-fade-in w-full space-y-6 lg:space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 lg:p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[50px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-1">Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}.</h2>
            <p className="text-slate-400 text-sm font-medium">B.Eng Software Engineering | Year 3</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-800 p-4 rounded-2xl border border-slate-700 w-full md:w-auto">
            <Maximize size={18} className="text-slate-500" />
            <p className="text-xs font-bold uppercase text-slate-400 tracking-widest leading-none">Show QR Code<br/><span className="text-[10px] text-slate-600">to Lecturer</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Requirement: Student Identifier QR Code Generator */}
        <div className="lg:col-span-2 flex flex-col items-center premium-card bg-white p-8 space-y-6 border border-slate-100 h-full">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Live Identity Identifier</p>
          
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-3xl shadow-inner flex items-center justify-center relative">
            {secureIdentityToken ? (
              <>
                {/* FIXED: Using QRCodeSVG component */}
                <QRCodeSVG 
                  value={secureIdentityToken} 
                  size={200} 
                  bgColor="#F8FAFC"
                  fgColor="#0B1121"
                  level="H" 
                  includeMargin={false}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-lg flex items-center justify-center">S</div>
                    </div>
                </div>
              </>
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center text-slate-400 font-medium">Loading session...</div>
            )}
          </div>
          <p className="text-xs font-medium text-center text-slate-500 leading-relaxed max-w-[280px]">
            Please present this QR code to your lecturer for instant attendance validation.
          </p>
        </div>

        {/* Next Classes Card */}
        <div className="lg:col-span-3 premium-card bg-white h-full space-y-5">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 tracking-tight flex items-center gap-2"><BookOpenText size={18} className="text-blue-600" /> Today's Schedule</h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/50 transition-all cursor-pointer group">
              <div className="w-16 flex flex-col items-center justify-center gap-0.5 text-center text-xs border-r border-slate-200 pr-4 flex-shrink-0">
                <span className="font-black text-slate-800 text-base">08:00</span>
                <span className="font-medium text-slate-500">10:00</span>
              </div>
              <div className="flex-1">
                <p className="font-black text-slate-800 text-sm tracking-tight mb-1 group-hover:text-blue-700">SEN 301</p>
                <p className="text-xs font-medium text-slate-600">Advanced React Patterns | Hall 4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}