import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Lock, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function StudentFees() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const pendingBalance = 50000;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Stripe Gateway Network Request
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2500);
  };

  if (paymentSuccess) {
    return (
      <div className="animate-fade-in max-w-3xl mx-auto mt-10">
        <div className="premium-card p-12 flex flex-col items-center text-center bg-white">
          <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Payment Successful!</h2>
          <p className="text-slate-500 mb-8 max-w-md">
            Your tuition payment of ₦{pendingBalance.toLocaleString()} has been processed successfully. An official receipt has been sent to your institutional email.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Tuition & Fees</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage your financial obligations and payment history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: INVOICE SUMMARY */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-[#0B1121] text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>
            <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Current Balance</p>
            <h3 className="text-5xl font-black tracking-tight mb-6">₦{pendingBalance.toLocaleString()}</h3>
            
            <div className="space-y-3 border-t border-slate-700/50 pt-6">
              <div className="flex justify-between text-sm font-medium text-slate-300">
                <span>Tuition (H1 2026)</span>
                <span>₦45,000</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-300">
                <span>Technology Fee</span>
                <span>₦5,000</span>
              </div>
            </div>
          </div>

          <div className="premium-card p-6 bg-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Secure Encrypted Checkout</h4>
              <p className="text-xs font-medium text-slate-500">Payments are processed via bank-grade 256-bit encryption.</p>
            </div>
          </div>
        </div>

        {/* RIGHT: STRIPE SIMULATION CHECKOUT */}
        <div className="premium-card p-8 bg-white">
          <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
            <CreditCard size={20} className="text-slate-400" /> Payment Details
          </h3>
          
          <form onSubmit={handlePayment} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cardholder Name</label>
              <input 
                type="text" required placeholder="Name on card"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Card Number</label>
              <div className="relative">
                <input 
                  type="text" required placeholder="0000 0000 0000 0000" maxLength="19"
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium font-mono outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
                <CreditCard size={18} className="absolute right-4 top-3.5 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expiry (MM/YY)</label>
                <input 
                  type="text" required placeholder="MM/YY" maxLength="5"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium font-mono outline-none focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">CVC</label>
                <div className="relative">
                  <input 
                    type="password" required placeholder="•••" maxLength="3"
                    className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium font-mono outline-none focus:border-blue-500 transition-all"
                  />
                  <Lock size={16} className="absolute right-4 top-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
              {isProcessing ? (
                <><Loader2 size={18} className="animate-spin" /> Processing Payment...</>
              ) : (
                <>Pay ₦{pendingBalance.toLocaleString()} <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}