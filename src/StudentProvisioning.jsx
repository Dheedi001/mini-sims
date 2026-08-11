import React, { useState, useEffect, useMemo } from 'react';
import { UserPlus, Mail, Key, ShieldCheck, CheckCircle2, Loader2, Building, GraduationCap, Copy } from 'lucide-react';
import { supabase } from './supabaseClient'; // Ensure this is created per the DB instructions

export default function StudentProvisioning() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: 'Software Engineering',
    level: '100 Level'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-generate the Registration Number based on current year and a mock sequence
  const currentYear = new Date().getFullYear();
  const mockSequence = '00142'; // In production, query the DB for the highest ID and add 1
  
  const generatedRegNo = useMemo(() => {
    if (!formData.firstName && !formData.lastName) return 'YYYYXXXXX';
    return `${currentYear}${mockSequence}`;
  }, [formData.firstName, formData.lastName, currentYear]);

  const generatedEmail = useMemo(() => {
    if (generatedRegNo === 'YYYYXXXXX') return 'pending@sims.edu.ng';
    return `${generatedRegNo}@sims.edu.ng`;
  }, [generatedRegNo]);

  const defaultPassword = 'sims' + currentYear; // e.g., sims2026

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleProvisionStudent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    /* 
      NOTE: In a production Supabase app, creating users without logging out the admin 
      requires a Secure Edge Function using the SUPABASE_SERVICE_ROLE_KEY. 
      This is the exact payload you would send to that function:
    */
    const newUserData = {
      email: generatedEmail,
      password: defaultPassword,
      role: 'student',
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      regNo: generatedRegNo,
      department: formData.department,
      level: formData.level,
      passwordChanged: false
    };

    // Simulating the secure network request to your Edge Function
    setTimeout(() => {
      console.log('Provisioned User:', newUserData);
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ firstName: '', lastName: '', department: 'Software Engineering', level: '100 Level' });
    }, 1500);
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Provision New Student</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Generate official credentials and assign academic departments.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: THE FORM */}
        <div className="flex-1 premium-card p-8 bg-white">
          <form onSubmit={handleProvisionStudent} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">First Name</label>
                <input 
                  type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required
                  placeholder="e.g. John" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Last Name</label>
                <input 
                  type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required
                  placeholder="e.g. Doe" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Department Assigned</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Building size={18} />
                </div>
                <select 
                  name="department" value={formData.department} onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 appearance-none"
                >
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Academic Level</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <GraduationCap size={18} />
                </div>
                <select 
                  name="level" value={formData.level} onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 appearance-none"
                >
                  <option value="100 Level">100 Level</option>
                  <option value="200 Level">200 Level</option>
                  <option value="300 Level">300 Level</option>
                  <option value="400 Level">400 Level</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !formData.firstName}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
              {isSubmitting ? 'Provisioning Account...' : 'Generate Credentials & Provision Student'}
            </button>

            {success && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold rounded-xl animate-fade-in flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-500" />
                Student successfully provisioned and added to database.
              </div>
            )}
          </form>
        </div>

        {/* RIGHT COLUMN: LIVE CREDENTIAL PREVIEW */}
        <div className="w-full lg:w-[450px]">
          <div className="sticky top-28 bg-[#0B1121] rounded-3xl p-8 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.3)] border border-slate-800 relative overflow-hidden group">
            
            {/* Ambient Lighting */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight">Virtual ID Card</h3>
                  <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mt-1">Live Preview</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  S
                </div>
              </div>

              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                   <UserPlus size={32} className="text-slate-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight leading-none mb-2">
                    {formData.firstName || 'First'} {formData.lastName || 'Last'}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <ShieldCheck size={12} /> Student Access
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex justify-between items-center group/item hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Registration No.</p>
                    <p className="text-sm font-black text-white font-mono">{generatedRegNo}</p>
                  </div>
                  <button onClick={() => copyToClipboard(generatedRegNo)} className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover/item:opacity-100"><Copy size={14} /></button>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex justify-between items-center group/item hover:bg-white/10 transition-colors">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Mail size={10} /> Institutional Email</p>
                    <p className="text-sm font-black text-white">{generatedEmail}</p>
                  </div>
                  <button onClick={() => copyToClipboard(generatedEmail)} className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover/item:opacity-100"><Copy size={14} /></button>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex justify-between items-center group/item hover:bg-white/10 transition-colors relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                  <div className="pl-2">
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Key size={10} /> Default Password</p>
                    <p className="text-sm font-black text-white font-mono">{defaultPassword}</p>
                  </div>
                  <button onClick={() => copyToClipboard(defaultPassword)} className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover/item:opacity-100"><Copy size={14} /></button>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}