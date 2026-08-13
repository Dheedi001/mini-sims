import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Megaphone, Send, BookOpen, MapPin, Mail, Phone } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  // Requirement: Announcements dynamically loaded via JavaScript array
  const announcements = [
    {
      id: 1,
      title: "End of Semester Examinations",
      date: "August 20, 2026",
      snippet: "The final timetable for the 2025/2026 academic session has been released.",
      fullText: "Please check your student portals for your specific exam venues and times. Clearance cards are mandatory for entry into the exam halls. Outstanding fees must be cleared by August 18th to generate a clearance card."
    },
    {
      id: 2,
      title: "Tech Innovation Hackathon",
      date: "August 25, 2026",
      snippet: "Join the annual campus hackathon and win up to ₦500,000 in prizes.",
      fullText: "Registration is open to all departments. Form a team of 3-5 students and submit your product proposals to the Faculty of Computing by the end of the week. Mentorship sessions start on Monday."
    },
    {
      id: 3,
      title: "Campus Facility Updates",
      date: "September 5, 2026",
      snippet: "The new digital library complex will be officially opened next month.",
      fullText: "The new complex features 24/7 high-speed internet, dedicated collaboration pods, and over 10,000 new digital subscriptions for engineering and science journals."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-500/30">
      
      {/* HEADER & NAVIGATION */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-lg shadow-md">
              S
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Mini-SIMS <span className="text-blue-600">Academy</span></h1>
          </div>
          
          <button 
            onClick={() => navigate('/login')}
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            Portal Login <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* HERO & MISSION SECTION */}
      <section className="bg-gradient-to-br from-[#0B1121] to-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Empowering the Future of Learning</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
            <strong className="text-white">Our Mission:</strong> To provide a dynamic, innovative, and accessible educational environment that equips students with the skills and knowledge to lead in a technology-driven world.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: ANNOUNCEMENTS */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <Megaphone className="text-blue-600" size={24} />
            <h3 className="text-2xl font-black text-slate-800">Campus Announcements</h3>
          </div>

          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">{announcement.date}</p>
                <h4 className="text-xl font-bold text-slate-800 mb-2">{announcement.title}</h4>
                <p className="text-slate-600 font-medium mb-4">{announcement.snippet}</p>
                
                {/* Expandable Read More Logic */}
                {expandedId === announcement.id && (
                  <div className="p-4 bg-slate-50 rounded-xl text-slate-700 text-sm font-medium mb-4 border border-slate-100 animate-fade-in">
                    {announcement.fullText}
                  </div>
                )}

                <button 
                  onClick={() => setExpandedId(expandedId === announcement.id ? null : announcement.id)}
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                >
                  {expandedId === announcement.id ? 'Show Less' : 'Read More'} <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM (Mockup) */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-2">Get in Touch</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">Have questions? Send us a message.</p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 transition-colors" required />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 transition-colors" required />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                <textarea rows="4" placeholder="How can we help you?" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-blue-500 transition-colors resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>

          {/* Contact Info Widget */}
          <div className="bg-slate-900 p-8 rounded-3xl text-white">
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-4 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-400" />
                <p>Topfaith University, Mkpatak</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <p>admissions@minisims.edu.ng</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400" />
                <p>+234 (0) 800 000 0000</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}