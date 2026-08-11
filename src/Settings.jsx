import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from './supabaseClient';
import { Shield, Key, User, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Settings() {
  const { user } = useSelector((state) => state.auth);
  
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwords.new !== passwords.confirm) {
      return setMessage({ type: 'error', text: 'New passwords do not match.' });
    }
    
    if (passwords.new.length < 6) {
      return setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
    }

    setIsUpdating(true);

    try {
      // REAL SUPABASE CRUD: Update the user's auth password
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) throw error;

      // If it's a student, we should ideally also update their profiles table to set password_changed = true
      if (user?.role === 'student') {
         await supabase.from('profiles').update({ password_changed: true }).eq('id', user.id);
      }

      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update password.' });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Account Settings</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage your profile details and security credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PROFILE INFORMATION */}
        <div className="lg:col-span-1 space-y-6">
          <div className="premium-card p-6 bg-white">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-3xl shadow-lg mb-6">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><User size={12}/> Full Name</p>
                <p className="font-bold text-slate-800">{user?.full_name || 'System Administrator'}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Mail size={12}/> Account / Reg No.</p>
                <p className="font-bold text-slate-800">{user?.regNo || user?.email || 'admin@sims.edu.ng'}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Shield size={12}/> Access Level</p>
                <span className="inline-flex mt-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">
                  {user?.role || 'Administrator'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY & PASSWORD UPDATE */}
        <div className="lg:col-span-2">
          <div className="premium-card p-8 bg-white">
            <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
              <Key size={20} className="text-slate-400" /> Update Password
            </h3>
            
            <form onSubmit={handlePasswordChange} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Password</label>
                <input 
                  type="password" required 
                  value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirm New Password</label>
                <input 
                  type="password" required 
                  value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {message.text && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                  {message.text}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isUpdating || !passwords.new}
                className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Shield size={18} />}
                {isUpdating ? 'Securing Account...' : 'Save New Password'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}