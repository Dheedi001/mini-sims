import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from './financeSlice';
import { fetchStudents } from './studentSlice';
import html2pdf from 'html2pdf.js';
import { Download, CheckCircle, Clock, Receipt } from 'lucide-react';

export default function Fees() {
  const dispatch = useDispatch();
  const { invoices, status: financeStatus } = useSelector((state) => state.finance);
  const { data: students, status: studentStatus } = useSelector((state) => state.students);

  useEffect(() => {
    if (financeStatus === 'idle') dispatch(fetchInvoices());
    if (studentStatus === 'idle') dispatch(fetchStudents());
  }, [financeStatus, studentStatus, dispatch]);

  const generatePDF = (invoice, studentName) => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 50px; font-family: 'Inter', sans-serif; color: #0f172a; max-width: 800px; margin: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 30px;">
           <div>
             <h1 style="color: #2563eb; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -1px;">Mini-SIMS</h1>
             <p style="color: #64748b; margin-top: 4px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Official Receipt</p>
           </div>
           <div style="text-align: right;">
             <p style="margin: 0; color: #64748b; font-size: 14px;">Receipt ID</p>
             <h3 style="margin: 0; color: #0f172a; font-size: 18px;">#REC-${invoice.id}</h3>
           </div>
        </div>
        
        <table style="width: 100%; margin-bottom: 40px; border-collapse: collapse;">
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #f8fafc;"><strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Student Name</strong><br/><span style="font-size: 16px; font-weight: 600;">${studentName}</span></td>
            <td style="padding: 15px 0; border-bottom: 1px solid #f8fafc; text-align: right;"><strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">Date Issued</strong><br/><span style="font-size: 16px; font-weight: 600;">${new Date().toLocaleDateString()}</span></td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; padding: 30px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
           <span style="font-size: 18px; font-weight: 700;">Total Amount Paid</span>
           <span style="font-size: 32px; font-weight: 900; color: #10b981;">₦${invoice.amount.toLocaleString()}</span>
        </div>

        <div style="margin-top: 50px; text-align: center;">
           <p style="font-size: 14px; font-weight: 700; color: #10b981; display: flex; align-items: center; justify-content: center; gap: 8px;">
             STATUS: PAID IN FULL
           </p>
           <p style="font-size: 12px; color: #94a3b8; margin-top: 10px;">This is a system-generated receipt and does not require a signature.</p>
        </div>
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: `Receipt-${invoice.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Financial Records</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage invoices, track payments, and generate official receipts.</p>
      </div>

      <div className="premium-card overflow-hidden max-w-5xl">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <Receipt size={20} className="text-slate-400" /> Invoice Ledger
          </h3>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-5 gap-4 mb-3 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div>Invoice ID</div>
            <div>Student Profile</div>
            <div>Amount Due</div>
            <div>Payment Status</div>
            <div className="text-right">Quick Action</div>
          </div>
          
          <div className="space-y-3">
            {financeStatus === 'loading' && (
              <div className="p-4 text-sm font-bold text-blue-500 animate-pulse text-center">Loading financial records...</div>
            )}
            
            {invoices.map((invoice) => {
              const student = students.find(s => s.id === invoice.studentId);
              const studentName = student ? student.name : 'Unknown Student';

              return (
                <div key={invoice.id} className="grid grid-cols-5 gap-4 p-5 rounded-2xl border border-slate-100 bg-white items-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-[1.01] hover:border-primary-100 transition-all duration-300 group">
                  
                  <div className="font-bold text-slate-500 text-sm tracking-wide">
                    #INV-{invoice.id}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-600 shadow-sm text-xs group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      {studentName.charAt(0)}
                    </div>
                    <div className="font-bold text-slate-800 text-sm">{studentName}</div>
                  </div>
                  
                  <div className="font-black text-slate-800 text-base">
                    ₦{invoice.amount.toLocaleString()}
                  </div>
                  
                  <div>
                    {invoice.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1.5 rounded-lg">
                        <CheckCircle size={14} /> Paid in Full
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200/60 px-2.5 py-1.5 rounded-lg">
                        <Clock size={14} /> Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    {invoice.status === 'Paid' ? (
                      <button 
                        onClick={() => generatePDF(invoice, studentName)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                      >
                        <Download size={14} /> Receipt
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] active:scale-95">
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}