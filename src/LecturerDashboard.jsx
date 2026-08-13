import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ScanSearch, BookOpenText, AlertTriangle, CheckCircle2, XCircle, Camera, Loader2, AlertCircle } from 'lucide-react';

export default function LecturerDashboard() {
  const [activeCourse, setActiveCourse] = useState('SEN 301');
  const [scanStatus, setScanStatus] = useState('idle'); // idle | loading | success | error | warning
  const [scanMessage, setScanMessage] = useState('Waiting for student code...');
  const [scannedStudentName, setScannedStudentName] = useState(null);
  const scannerRef = useRef(null);

  // Requirement: Lecturer uses scanner, marks present if in class, in sync with database
  useEffect(() => {
    if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner("reader", {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            rememberLastUsedCamera: true,
            supportedScanTypes: [0] // QR Codes only
        }, false);
    }

    const onScanSuccess = async (decodedText, decodedResult) => {
        // Prevent double scanning while processing
        if (scanStatus === 'loading') return;
        setScanStatus('loading');
        setScanMessage('Validating in master ledger...');
        setScannedStudentName(null);

        // Security Validation: Ensure it's our specific format "REG_NO:XXXX"
        if (!decodedText.startsWith('REG_NO:')) {
            setScanStatus('error');
            setScanMessage('Invalid QR Code format.');
            return;
        }

        // Parse student registration number from scanned text
        const regNo = decodedText.split(':')[1];

        try {
            // Requirement: Sync with database. Call secure RPC function.
            const { data, error } = await supabase.rpc('validate_and_mark_attendance', {
                scanned_reg_no: regNo,
                target_course_code: activeCourse
            });

            if (error) throw error;

            // Process the server-side response
            if (data.status === 'success') {
                setScanStatus('success');
                setScanMessage(data.message);
                setScannedStudentName(data.student_name);
                // In production, we would also trigger a successful 'ding' sound
            } else if (data.status === 'warning') {
                setScanStatus('warning');
                setScanMessage(data.message);
            } else {
                setScanStatus('error');
                setScanMessage(data.message);
            }
        } catch (error) {
            setScanStatus('error');
            setScanMessage('Database connection error.');
        } finally {
            // Keep the status visible for feedback, then reset automatically for next scan
            setTimeout(() => {
                if (scanStatus !== 'loading') {
                   // setScanStatus('idle'); // We reset to allow next scan naturally
                   // setScanMessage('Waiting for student code...');
                   setScanStatus('idle');
                }
            }, 3000); // 3 seconds feedback loop
        }
    };

    const onScanFailure = (error) => {
        // html5-qrcode calls this for every frame it can't read, usually fine to ignore
        // setScanStatus('error');
        // setScanMessage('Scanning failed.');
    };

    scannerRef.current.render(onScanSuccess, onScanFailure);

    // Clean up scanner on component unmount
    return () => {
        if (scannerRef.current) {
            scannerRef.current.clear().catch(error => {
                console.error("Failed to clear scanner:", error);
            });
        }
    };
  }, [activeCourse, scanStatus]);

  const StatusIcon = () => {
      if (scanStatus === 'loading') return <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />;
      if (scanStatus === 'success') return <CheckCircle2 className="w-12 h-12 text-emerald-500" />;
      if (scanStatus === 'warning') return <AlertCircle className="w-12 h-12 text-amber-500" />;
      if (scanStatus === 'error') return <XCircle className="w-12 h-12 text-coral-500" />;
      return <Camera className="w-12 h-12 text-slate-400 animate-pulse" />;
  };

  return (
    <div className="animate-fade-in w-full space-y-6 lg:space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="p-6 lg:p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row justify-between md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[50px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight mb-1">Live QR Attendance Session</h2>
          <p className="text-slate-400 text-sm font-medium">Active Course | {activeCourse}</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 w-full md:w-auto">
            <AlertTriangle size={18} className="text-emerald-400" />
            <p className="text-xs font-bold uppercase text-emerald-400 tracking-widest leading-none">Security:<br/><span className="text-[10px] text-emerald-600">Active Anti-Spoofing</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Requirement: Lecturer scans with a scanner */}
        <div className="xl:col-span-2 premium-card bg-white space-y-6 border border-slate-100 p-6 lg:p-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                 <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2"><ScanSearch size={18} className="text-blue-600" /> Live Scanner Module</h3>
                 <p className="text-xs font-medium text-slate-500 mt-1">Please ensure camera permissions are active.</p>
              </div>
              <select 
                value={activeCourse}
                onChange={(e) => setActiveCourse(e.target.value)}
                className="w-full md:w-auto px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-blue-600 outline-none focus:border-blue-500 shadow-sm cursor-pointer transition-all"
                >
                <option value="SEN 301">Advanced React Patterns (SEN 301)</option>
                <option value="SEN 305">Database Architecture (SEN 305)</option>
              </select>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6 bg-slate-50 border border-slate-100 rounded-3xl p-6 lg:p-8 relative overflow-hidden">
             {/* THE ACTUAL SCANNER RENDER TARGET */}
             <div id="reader" className="w-full max-w-[500px] bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-900 aspect-square relative z-10">
                {/* The html5-qrcode scanner renders inside this div */}
             </div>
             
             {scanStatus !== 'idle' && (
                 <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-8 text-center gap-2 animate-fade-in">
                     <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center justify-center">
                        <StatusIcon />
                     </div>
                     {scannedStudentName && <p className="text-xl font-black text-white mt-4">{scannedStudentName}</p>}
                     <p className={`text-base font-bold ${scanStatus === 'success' ? 'text-emerald-400' : scanStatus === 'warning' ? 'text-amber-400' : scanStatus === 'error' ? 'text-coral-400' : 'text-slate-300'}`}>
                        {scanMessage}
                     </p>
                 </div>
             )}
          </div>
        </div>

        {/* Real-time Session Activity Card */}
        <div className="premium-card bg-white h-full space-y-6">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
              <h3 className="font-bold text-slate-800 tracking-tight flex items-center gap-2"><BookOpenText size={18} className="text-emerald-600" /> Present (8/32)</h3 >
              <button className="text-xs font-bold px-3 py-1.5 rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-colors">Clear Ledger</button>
          </div>
          
          <div className="p-6 pt-0 space-y-3 overflow-y-auto max-h-[500px] custom-scrollbar">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl animate-slide-up">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <div>
                <p className="text-sm font-bold text-emerald-800">Destiny Enobong</p>
                <p className="text-[11px] font-mono text-emerald-600 mt-0.5">Scanned at: 08:05:32</p>
              </div>
            </div>
             {/* Present students would populate here automatically from Supabase Realtime */}
          </div>
        </div>
      </div>
    </div>
  );
}