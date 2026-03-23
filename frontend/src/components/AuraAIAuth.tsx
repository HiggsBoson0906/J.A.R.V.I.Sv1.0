import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = `${import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001/api' : 'https://j-a-r-v-i-sv1-0.onrender.com/api')}`;

export default function AuraAIAuth() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && user.userId) {
        navigate('/dashboard');
      }
    }
  }, [navigate]);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('Select Course');
  const [year, setYear] = useState('Select Year');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCourseDrop, setShowCourseDrop] = useState(false);
  const [showYearDrop, setShowYearDrop] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill in all fields");
    
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.data));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch(err) {
      setError('Failed to connect to server');
    } finally { setLoading(false); }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return setError("Please fill in all required fields");
    if (password !== confirmPassword) return setError("Passwords do not match");
    
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          password,
          course: course !== 'Select Course' ? course : null,
          exam_year: year !== 'Select Year' ? year : null
        })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.data));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Creation failed');
      }
    } catch(err) {
      setError('Failed to connect to server');
    } finally { setLoading(false); }
  };

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
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/10 blur-[100px] rounded-full"></div>
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-gradient-to-b from-slate-950/50 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-400/5 rounded-xl"></div>
              <div className="relative w-7 h-7 flex items-center justify-center">
                <div className="absolute inset-0 animate-spin" style={{animationDuration:'10s'}}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="13" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.45"/>
                  </svg>
                </div>
                <div className="absolute inset-0 animate-spin" style={{animationDuration:'7s', animationDirection:'reverse'}}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="9" stroke="#22d3ee" strokeWidth="1" strokeDasharray="5 2" opacity="0.65"/>
                  </svg>
                </div>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="absolute inset-0">
                  <circle cx="14" cy="14" r="5.5" stroke="#22d3ee" strokeWidth="1.5"/>
                  <circle cx="14" cy="14" r="2.5" fill="#22d3ee"/>
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter font-headline text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">J.A.R.V.I.S.</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Study Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 ml-4 hidden sm:flex">
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
            <div className="flex p-1 bg-white/5 rounded-full border border-white/10 mb-8 relative z-20">
              <button 
                className={`flex-1 py-3 text-sm font-semibold tracking-wide rounded-full transition-all duration-500 ${activeTab === 'login' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white'}`}
                onClick={() => { setActiveTab('login'); setError(''); }}
              >
                Login
              </button>
              <button 
                className={`flex-1 py-3 text-sm font-semibold tracking-wide rounded-full transition-all duration-500 ${activeTab === 'signup' ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white'}`}
                onClick={() => { setActiveTab('signup'); setError(''); }}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm relative z-20">
                <AlertCircle size={16} />
                <p>{error}</p>
              </div>
            )}

            {/* Login Form */}
            <div className={`transition-all duration-500 pb-2 ${activeTab === 'login' ? 'opacity-100 translate-y-0 block relative z-10' : 'opacity-0 translate-y-[20px] hidden relative z-0'}`}>
              <div className="mb-8 relative z-20">
                <h1 className="text-3xl font-headline font-bold shimmer-text mb-2">Welcome Back</h1>
                <p className="text-slate-400 text-sm">Enter your credentials to access your workspace.</p>
              </div>
              <form className="space-y-5 relative z-20" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Email</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-4 px-5 rounded-lg text-sm" 
                    placeholder="name@domain.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#3525cd] to-[#4f46e5] shadow-[0_4px_20px_rgba(53,37,205,0.4)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(53,37,205,0.6)] hover:brightness-110 py-4 rounded-full font-bold text-sm tracking-widest uppercase mt-4 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0" 
                  type="submit"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
                </button>
              </form>
            </div>

            {/* Sign Up Form */}
            <div className={`transition-all duration-500 pb-2 ${activeTab === 'signup' ? 'opacity-100 translate-y-0 block relative z-10' : 'opacity-0 translate-y-[20px] hidden relative z-0'}`}>
              <div className="mb-8 relative z-20">
                <h1 className="text-3xl font-headline font-bold shimmer-text mb-2">Create Account</h1>
                <p className="text-slate-400 text-sm">Join the elite AURA AI ecosystem today.</p>
              </div>
              <form className="space-y-4 relative z-20" onSubmit={handleSignup}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Full Name</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm" 
                      placeholder="John Doe" 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Email</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm" 
                      placeholder="john@aura.ai" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 relative">
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Course</label>
                    <div className="relative">
                      <div 
                        onClick={() => setShowCourseDrop(!showCourseDrop)}
                        className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm flex justify-between items-center cursor-pointer"
                      >
                        <span className={course === 'Select Course' ? 'text-slate-400' : 'text-white'}>{course}</span>
                        <ChevronDown size={16} />
                      </div>
                      {showCourseDrop && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-[#0b0f19] shadow-[0_0_40px_rgba(53,37,205,0.4)] rounded-xl border border-white/10 z-50 overflow-hidden">
                          <div className="p-2 space-y-1">
                            {['JEE', 'NEET'].map(c => (
                              <div key={c} onClick={() => { setCourse(c); setShowCourseDrop(false); }} className="px-4 py-2 hover:bg-white/10 rounded-lg cursor-pointer text-sm font-bold transition-colors">{c}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 relative">
                    <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Exam Year</label>
                    <div className="relative">
                      <div 
                        onClick={() => setShowYearDrop(!showYearDrop)}
                        className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm flex justify-between items-center cursor-pointer"
                      >
                        <span className={year === 'Select Year' ? 'text-slate-400' : 'text-white'}>{year}</span>
                        <ChevronDown size={16} />
                      </div>
                      {showYearDrop && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-[#0b0f19] shadow-[0_0_40px_rgba(53,37,205,0.4)] rounded-xl border border-white/10 z-50 overflow-hidden">
                          <div className="p-2 space-y-1">
                            {['2026', '2027', '2028', '2029'].map(y => (
                              <div key={y} onClick={() => { setYear(y); setShowYearDrop(false); }} className="px-4 py-2 hover:bg-white/10 rounded-lg cursor-pointer text-sm font-bold transition-colors">{y}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Password</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm" 
                    placeholder="••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 ml-1">Confirm Password</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 text-white transition-all duration-300 focus:bg-white/10 focus:border-indigo-600 focus:shadow-[0_0_15px_rgba(79,70,229,0.3)] focus:outline-none py-3 px-5 rounded-lg text-sm" 
                    placeholder="••••••••" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#3525cd] to-[#4f46e5] shadow-[0_4px_20px_rgba(53,37,205,0.4)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(53,37,205,0.6)] hover:brightness-110 py-4 rounded-full font-bold text-sm tracking-widest uppercase mt-4 relative z-20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0" 
                  type="submit"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : 'Create Account'}
                </button>
              </form>
            </div>
          </div>
          
          {/* Footer Meta */}
          <div className="mt-8 flex flex-col items-center gap-4 relative z-20">
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
          © 2026 V.A.R.V.I.S.  AI Platform. Engineered for Excellence.
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
