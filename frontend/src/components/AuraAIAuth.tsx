import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AuraAIAuth() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Custom styles for this specific modular component
  const auroraBgStyle = {
    backgroundColor: '#0b0f19',
    backgroundImage: `
      radial-gradient(at 0% 0%, rgba(53, 37, 205, 0.15) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(79, 70, 229, 0.15) 0px, transparent 50%),
      radial-gradient(at 50% 100%, rgba(51, 35, 204, 0.1) 0px, transparent 50%)
    `,
    overflow: 'hidden',
    position: 'relative' as const,
  };

  return (
    <div style={auroraBgStyle} className="min-h-screen font-body text-white selection:bg-primary-container selection:text-white">
      {/* Grid Overlay */}
      <div className="fixed inset-0 grid-overlay pointer-events-none"></div>
      
      {/* Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/10 blur-[100px] rounded-full"></div>
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-gradient-to-b from-slate-950/50 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-headline font-black tracking-tighter text-indigo-400 drop-shadow-[0_0_12px_rgba(79,70,229,0.8)]">
            AURA AI
          </span>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 ml-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-[pulse_2s_infinite]"></div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400">System Online</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors" href="#">Help</a>
          <a className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors" href="#">Language</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center p-6 pt-24 pb-16">
        <div className="w-full max-w-[500px] float-card">
          {/* Floating Neon Card */}
          <div className="bg-white/5 backdrop-blur-[24px] border border-white/[0.08] shadow-[0_0_40px_rgba(53,37,205,0.15)] relative rounded-xl p-8 md:p-10 overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_25px_rgba(79,70,229,0.2)]">
            <div className="scan-line"></div>
            
            {/* Tab Toggle */}
            <div className="flex p-1 bg-white/5 rounded-full border border-white/10 mb-10 relative z-20">
              <button 
                className={`flex-1 py-3 text-sm font-semibold tracking-wide rounded-full transition-all duration-500 ${activeTab === 'login' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white'}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button 
                className={`flex-1 py-3 text-sm font-semibold tracking-wide rounded-full transition-all duration-500 ${activeTab === 'signup' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white'}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            <div className={`transition-all duration-500 pb-2 ${activeTab === 'login' ? 'opacity-100 translate-y-0 block relative z-10' : 'opacity-0 translate-y-[20px] hidden relative z-0'}`}>
              <div className="mb-8 relative z-20">
                <h1 className="text-3xl font-headline font-bold shimmer-text mb-2">Welcome Back</h1>
                <p className="text-slate-400 text-sm">Enter your credentials to access your workspace.</p>
              </div>
              <form className="space-y-5 relative z-20" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Email or Phone</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-4 px-5 rounded-lg text-sm" 
                    placeholder="name@domain.com" 
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400">Password</label>
                    <a className="text-[11px] uppercase tracking-widest font-bold text-indigo-400 hover:text-indigo-300" href="#">Forgot password?</a>
                  </div>
                  <input 
                    className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-4 px-5 rounded-lg text-sm" 
                    placeholder="••••••••" 
                    type="password"
                  />
                </div>
                <button 
                  className="w-full bg-gradient-to-r from-[#3525cd] to-[#4f46e5] shadow-[0_4px_20px_rgba(53,37,205,0.4)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(53,37,205,0.6)] hover:brightness-110 py-4 rounded-full font-bold text-sm tracking-widest uppercase mt-4" 
                  type="submit"
                >
                  Sign In
                </button>
              </form>
            </div>

            {/* Sign Up Form */}
            <div className={`transition-all duration-500 pb-2 ${activeTab === 'signup' ? 'opacity-100 translate-y-0 block relative z-10' : 'opacity-0 translate-y-[20px] hidden relative z-0'}`}>
              <div className="mb-8 relative z-20">
                <h1 className="text-3xl font-headline font-bold shimmer-text mb-2">Create Account</h1>
                <p className="text-slate-400 text-sm">Join the elite AURA AI ecosystem today.</p>
              </div>
              <form className="space-y-4 relative z-20" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Full Name</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm" 
                      placeholder="John Doe" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Email</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm" 
                      placeholder="john@aura.ai" 
                      type="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Course</label>
                    <div className="relative group">
                      <div className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm flex justify-between items-center cursor-pointer">
                        <span>Select Course</span>
                        <ChevronDown size={16} />
                      </div>
                      <div className="absolute top-full left-0 w-full mt-2 bg-[#0b0f19] shadow-[0_0_40px_rgba(53,37,205,0.4)] rounded-xl border border-white/10 z-50 hidden group-hover:block">
                        <div className="p-2 space-y-1">
                          <div className="px-4 py-2 hover:bg-white/10 rounded-lg cursor-pointer text-sm font-bold transition-colors">JEE</div>
                          <div className="px-4 py-2 hover:bg-white/10 rounded-lg cursor-pointer text-sm font-bold transition-colors">NEET</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Exam Year</label>
                    <div className="relative group">
                      <div className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm flex justify-between items-center cursor-pointer">
                        <span>Select Year</span>
                        <ChevronDown size={16} />
                      </div>
                      <div className="absolute top-full left-0 w-full mt-2 bg-[#0b0f19] shadow-[0_0_40px_rgba(53,37,205,0.4)] rounded-xl border border-white/10 z-50 hidden group-hover:block">
                        <div className="p-2 space-y-1">
                          {[2026, 2027, 2028, 2029].map(year => (
                            <div key={year} className="px-4 py-2 hover:bg-white/10 rounded-lg cursor-pointer text-sm font-bold transition-colors">
                              {year}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Password</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm" 
                    placeholder="••••••••" 
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Confirm Password</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm" 
                    placeholder="••••••••" 
                    type="password"
                  />
                </div>
                <button 
                  className="w-full bg-gradient-to-r from-[#3525cd] to-[#4f46e5] shadow-[0_4px_20px_rgba(53,37,205,0.4)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(53,37,205,0.6)] hover:brightness-110 py-4 rounded-full font-bold text-sm tracking-widest uppercase mt-4 relative z-20" 
                  type="submit"
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
          
          {/* Footer Meta */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 text-center">
              Secured by AURA Encryption Protocol v4.2
            </p>
            <div className="flex gap-4">
              <span className="text-[10px] uppercase tracking-widest text-slate-600 hover:text-indigo-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-slate-800">|</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-600 hover:text-indigo-400 cursor-pointer transition-colors">Term of Service</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component (Shared) */}
      <footer className="fixed bottom-0 w-full flex flex-col md:flex-row justify-between items-center px-8 py-6 gap-4 bg-slate-950/90 backdrop-blur-md z-50">
        <p className="font-label text-xs uppercase tracking-widest text-slate-500">
          © 2024 AURA AI Platform. Engineered for Excellence.
        </p>
        <div className="flex gap-6">
          <a className="font-label text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors" href="#">Privacy</a>
          <a className="font-label text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors" href="#">Terms</a>
          <a className="font-label text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors" href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}
