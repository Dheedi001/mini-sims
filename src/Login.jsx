import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './authSlice';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    
    // Simulate a premium network delay for the loading animation
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        dispatch(login({ username: 'Administrator' }));
        navigate('/dashboard');
      } else {
        setError(true);
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0B1121] flex items-center justify-center font-sans relative overflow-hidden selection:bg-blue-500/30">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none"></div>

      {/* GLASSMORPHIC LOGIN PANEL */}
      <div className="w-full max-w-md p-10 bg-white/5 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative z-10 animate-slide-up">
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-400/20 relative group hover:scale-105 transition-transform duration-300">
            S
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
          <p className="text-sm font-medium text-slate-400">Enter your credentials to access the portal.</p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <ShieldCheck size={12} /> Secure Connection
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-coral-500/10 border border-coral-500/20 text-coral-400 text-sm font-bold rounded-2xl text-center animate-fade-in flex items-center justify-center gap-2">
            Invalid credentials. Please try again.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="admin" 
                required
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(false); }}
                className="w-full pl-11 pr-4 py-3.5 bg-[#0F172A]/50 border border-slate-700/50 text-white rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className="w-full pl-11 pr-4 py-3.5 bg-[#0F172A]/50 border border-slate-700/50 text-white rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-600"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-wait"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Authenticate <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs font-medium text-slate-500">
          Authorized personnel only. <br/> Hint: <span className="text-slate-400">admin / admin123</span>
        </div>
      </div>
    </div>
  );
}