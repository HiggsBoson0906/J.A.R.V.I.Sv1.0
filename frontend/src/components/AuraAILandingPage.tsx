import React, { useEffect } from 'react';
import { 
  UserCircle, 
  Bot, 
  Brain, 
  Terminal, 
  Calendar, 
  BarChart, 
  Sparkles, 
  Book, 
  Timer, 
  TrendingUp, 
  CheckCircle2,
  CircleDot,
  Zap,
  Target
} from 'lucide-react';

export default function AuraAILandingPage() {
  useEffect(() => {
    // Scroll Reveal Script
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // Once visible, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial targeting of all elements with .section-enter
    const revealSections = document.querySelectorAll('.section-enter');
    revealSections.forEach(section => {
        observer.observe(section);
    });

    // Counter Animation Script
    function animateValue(obj: Element, start: number, end: number, duration: number) {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = progress * (end - start) + start;
            
            // Format to 1 decimal place if the target is a float, else whole number
            if (end % 1 !== 0) {
                obj.innerHTML = current.toFixed(1);
            } else {
                obj.innerHTML = Math.floor(current).toString();
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetVal = entry.target.getAttribute('data-target');
                if (targetVal) {
                    const target = parseFloat(targetVal);
                    animateValue(entry.target, 0, target, 2000);
                    counterObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    return () => {
        observer.disconnect();
        counterObserver.disconnect();
    }
  }, []);

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
      {/* Navigation Shell */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-xl transition-all">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-indigo-600 drop-shadow-[0_0_8px_rgba(79,70,229,0.6)] font-headline">J.A.R.V.I.S.</span>
          <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full">AURA v2.4</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-indigo-600 border-b-2 border-indigo-500 pb-1 font-label text-[0.75rem] tracking-widest uppercase font-medium" href="#">Neural Hub</a>
          <a className="text-slate-600 hover:text-indigo-500 transition-colors font-label text-[0.75rem] tracking-widest uppercase font-medium" href="#">Study Core</a>
          <a className="text-slate-600 hover:text-indigo-500 transition-colors font-label text-[0.75rem] tracking-widest uppercase font-medium" href="#">Aura Sync</a>
          <a className="text-slate-600 hover:text-indigo-500 transition-colors font-label text-[0.75rem] tracking-widest uppercase font-medium" href="#">Laboratory</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 bg-primary text-white rounded-full font-label text-[0.75rem] tracking-widest uppercase font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20">
            Initialize AI
          </button>
          <UserCircle className="text-on-surface-variant cursor-pointer hover:text-primary transition-colors" size={24} />
        </div>
      </nav>

      <main className="relative overflow-hidden pt-20">
        {/* Aurora Background Elements */}
        <div className="absolute inset-0 aurora-bg -z-10"></div>
        <div className="absolute inset-0 grid-overlay -z-10 opacity-40"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10"></div>
        
        {/* Hero Section */}
        <div className="section-enter">
          <section className="relative min-h-[921px] flex flex-col items-center justify-center px-6 text-center">
            <div className="flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[0.7rem] font-mono tracking-tighter text-on-surface-variant uppercase">AURA AI v2.4 ACTIVATED</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-syne font-extrabold tracking-tight leading-tight text-on-surface glitch-text transition-all duration-300">
              Your AI-Powered<br/><span className="text-primary italic">Learning Companion</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-on-surface-variant font-outfit shimmer-text">
              Adaptive practice, AI tutor, and personalized study plans specifically engineered for JEE and NEET aspirants.
            </p>
            <div className="mt-12 flex flex-col md:flex-row gap-6">
              <button className="px-10 py-5 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-headline text-lg font-bold shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                Start Practice
              </button>
              <button className="px-10 py-5 bg-surface-container-high text-on-surface rounded-full font-headline text-lg font-bold hover:bg-surface-variant transition-all flex items-center gap-2">
                Try AI Tutor
                <Bot />
              </button>
            </div>
            
            {/* Stats Bar Addition */}
            <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 animate-[fadeUp_1s_ease-out]">
              <div className="float-card flex flex-col items-center p-6 rounded-2xl bg-surface-container-lowest/50 backdrop-blur-md border border-outline-variant/20 shadow-xl shadow-primary/5 neon-card">
                <span className="text-3xl font-black font-headline shimmer-text" style={{ backgroundImage: "linear-gradient(90deg, #3525cd 0%, #4f46e5 50%, #3525cd 100%)" }}><span className="stat-counter" data-target="5.4">0</span>k+</span>
                <span className="text-[0.65rem] font-mono font-bold text-on-surface-variant uppercase tracking-widest mt-1">Topics Covered</span>
              </div>
              <div className="float-card flex flex-col items-center p-6 rounded-2xl bg-surface-container-lowest/50 backdrop-blur-md border border-outline-variant/20 shadow-xl shadow-primary/5 neon-card" style={{ animationDelay: "0.2s" }}>
                <span className="text-3xl font-black font-headline shimmer-text" style={{ backgroundImage: "linear-gradient(90deg, #3525cd 0%, #4f46e5 50%, #3525cd 100%)" }}><span className="stat-counter" data-target="12">0</span>k+</span>
                <span className="text-[0.65rem] font-mono font-bold text-on-surface-variant uppercase tracking-widest mt-1">Doubts Cleared</span>
              </div>
              <div className="float-card flex flex-col items-center p-6 rounded-2xl bg-surface-container-lowest/50 backdrop-blur-md border border-outline-variant/20 shadow-xl shadow-primary/5 neon-card" style={{ animationDelay: "0.4s" }}>
                <span className="text-3xl font-black font-headline shimmer-text" style={{ backgroundImage: "linear-gradient(90deg, #3525cd 0%, #4f46e5 50%, #3525cd 100%)" }}><span className="stat-counter" data-target="50">0</span>k+</span>
                <span className="text-[0.65rem] font-mono font-bold text-on-surface-variant uppercase tracking-widest mt-1">Students Registered</span>
              </div>
            </div>
            
            {/* Floating Data Streams/Stats */}
            <div className="absolute hidden lg:block left-10 top-1/2 -translate-y-1/2 space-y-4 font-mono text-[0.6rem] text-primary/40 text-left opacity-60">
              <div>[SYSTEM_SYNC] 100%</div>
              <div>[DATA_FLOW] 2.4 GB/S</div>
              <div>[NEURAL_LINK] ACTIVE</div>
              <div className="h-24 w-[1px] bg-gradient-to-b from-primary/40 to-transparent ml-2"></div>
            </div>
            <div className="absolute hidden lg:block right-10 top-1/2 -translate-y-1/2 space-y-6">
              <div className="float-card p-4 rounded-xl bg-surface-container-lowest shadow-2xl border border-outline-variant/5">
                <div className="text-[0.65rem] uppercase text-on-surface-variant font-bold mb-1">Efficiency</div>
                <div className="text-2xl font-black text-primary font-headline">98.2%</div>
              </div>
              <div className="float-card p-4 rounded-xl bg-surface-container-lowest shadow-2xl border border-outline-variant/5" style={{ animationDelay: "1.5s" }}>
                <div className="text-[0.65rem] uppercase text-on-surface-variant font-bold mb-1">Concepts</div>
                <div className="text-2xl font-black text-secondary font-headline">4.5k+</div>
              </div>
            </div>
          </section>
        </div>

        {/* Features Bento Grid */}
        <div className="section-enter">
          <section className="max-w-7xl mx-auto px-8 py-24">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-headline font-extrabold mb-4">Master Every Dimension</h2>
              <p className="text-on-surface-variant">Precision tools designed for high-stakes preparation.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
              <div className="md:col-span-2 md:row-span-2 neon-card bg-surface-container-lowest p-10 rounded-lg relative overflow-hidden group">
                <div className="scan-line"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <Brain className="text-primary mb-6" size={48} />
                  <h3 className="text-3xl font-headline font-bold mb-4">Adaptive Practice</h3>
                  <p className="text-on-surface-variant text-lg">Our engine analyzes your weaknesses in real-time, serving questions that bridge the gap between your current level and mastery.</p>
                  <div className="mt-auto pt-8">
                    <img className="w-full h-48 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700 opacity-20 group-hover:opacity-40" alt="Abstract neural network mesh visualization" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtOJjmW2dtkGoCLvr3tjbCfHvgElemiEx2QsTxVfWOd4q0mdXIm38wz0rYx_hEVPg9n62uvySpCD5IpLOVEeAJwg7YFS69raIBlc71UI0Vm2O9CVY5FnPV4xK9IEYQYj9E3fpD-tsrF7amB7xnn3NSOad0MqS4N0T9G1U4Ziu15znxrWrjwN7S0781Swo5-oYHNJyPn6I7TXwT2goO069iqypQYtj9mrqzkrt8ZF2Omy9bd_5o_G6V7DpUgn7XmxLF9UMIyFF59QE"/>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 neon-card bg-surface-container p-8 rounded-lg flex gap-6 items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-headline font-bold mb-2">AI Tutor (RAG)</h3>
                  <p className="text-on-surface-variant text-sm">Instant clarifications based on verified curriculum &amp; textbooks.</p>
                </div>
                <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Terminal className="text-primary" size={40} />
                </div>
              </div>
              <div className="neon-card bg-surface-container-low p-8 rounded-lg">
                <Calendar className="text-secondary mb-4" size={32} />
                <h3 className="text-lg font-headline font-bold mb-2">Study Planner</h3>
                <p className="text-on-surface-variant text-xs">Dynamic scheduling that adjusts to your pace.</p>
              </div>
              <div className="neon-card bg-surface-container-low p-8 rounded-lg">
                <BarChart className="text-primary mb-4" size={32} />
                <h3 className="text-lg font-headline font-bold mb-2">Analytics</h3>
                <p className="text-on-surface-variant text-xs">Deep dive into performance bottlenecks.</p>
              </div>
            </div>
          </section>
        </div>

        {/* AI Tutor Preview */}
        <div className="section-enter">
          <section className="max-w-5xl mx-auto px-8 py-24">
            <div className="bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden border border-outline-variant/10">
              <div className="bg-surface-container px-6 py-4 flex items-center justify-between border-b border-outline-variant/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <span className="font-headline font-bold">AURA AI Tutor</span>
                </div>
                <span className="text-[0.65rem] font-mono text-on-surface-variant">ENCRYPTION: AES-256</span>
              </div>
              <div className="p-8 space-y-8 min-h-[400px]">
                <div className="flex flex-col items-end animate-[fadeUp_0.5s_ease-out]">
                  <div className="bg-secondary-container text-on-secondary-container p-4 rounded-2xl rounded-tr-none max-w-md shadow-sm">
                    <p className="text-sm">Explain SN1 mechanism and why it favors tertiary carbocations.</p>
                  </div>
                  <span className="text-[0.6rem] text-on-surface-variant mt-2">Student • 14:20</span>
                </div>
                <div className="flex gap-4 animate-[fadeUp_0.7s_ease-out]">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                    <Sparkles size={16} className="text-primary" />
                  </div>
                  <div className="space-y-4 max-w-xl">
                    <div className="bg-surface-container-low p-5 rounded-2xl rounded-tl-none border border-outline-variant/10">
                      <p className="text-sm leading-relaxed mb-4">The SN1 mechanism occurs in two steps. First, the leaving group departs to form a **carbocation intermediate**.</p>
                      <div className="bg-surface-container-highest p-3 rounded-lg font-mono text-xs text-primary mb-4">
                        R-X → R⁺ + X⁻ (Slow Step)
                      </div>
                      <p className="text-sm leading-relaxed">Tertiary carbocations are favored due to **Inductive Effect (+I)** and **Hyperconjugation** from the three surrounding alkyl groups, which stabilize the positive charge better than primary or secondary ones.</p>
                      <div className="mt-4 pt-4 border-t border-outline-variant/20 flex items-center gap-2">
                        <Book size={14} className="text-primary" />
                        <span className="text-[0.65rem] italic text-on-surface-variant">Source: M.S. Chauhan Advanced Organic Chemistry</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center mt-4">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]"></span>
                  </div>
                  <span className="text-[0.7rem] font-medium text-on-surface-variant uppercase tracking-widest">Generating Insight...</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Adaptive Practice Preview */}
        <div className="section-enter">
          <section className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-headline font-extrabold mb-6 leading-tight">Quantify Your <span className="text-primary">Cognitive Growth</span></h2>
              <p className="text-on-surface-variant text-lg mb-10">Real-time performance tracking with difficulty-adjusted problem sets. Never solve a question that's too easy or impossibly hard again.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Timer size={24} className="text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Average Response Time</div>
                    <div className="text-on-surface-variant text-sm">Target: 45s • Current: 52s</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/5 flex items-center justify-center group-hover:bg-secondary transition-colors">
                    <TrendingUp size={24} className="text-secondary group-hover:text-white" />
                  </div>
                  <div>
                    <div className="font-bold">Difficulty Scalability</div>
                    <div className="text-on-surface-variant text-sm">Dynamic adjustment based on 1.2M student data points.</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-container p-1 rounded-xl shadow-inner">
              <div className="bg-surface-container-lowest rounded-lg p-8 shadow-xl">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-mono font-bold bg-surface-container-high px-3 py-1 rounded-full">PHYSICS | NEWTON'S LAWS</span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-mono font-bold text-red-500">01:42</span>
                  </div>
                </div>
                <h4 className="text-xl font-headline font-bold mb-8 leading-relaxed">Calculate the net work done on a block of mass 2kg pulled by 10N force at an angle of 30° for 5 meters on a smooth surface.</h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group">
                    <span>A) 25 J</span>
                    <CheckCircle2 className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" size={24} />
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group">
                    <span>B) 50 J</span>
                    <CheckCircle2 className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" size={24} />
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border-2 border-primary bg-primary/5 flex justify-between items-center">
                    <span className="font-bold text-primary">C) 25√3 J</span>
                    <CircleDot className="text-primary" size={24} />
                  </button>
                  <button className="w-full text-left p-4 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group">
                    <span>D) 100 J</span>
                    <CheckCircle2 className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" size={24} />
                  </button>
                </div>
                <div className="mt-10">
                  <div className="flex justify-between text-[0.65rem] font-bold text-on-surface-variant uppercase mb-2">
                    <span>Current Difficulty Level</span>
                    <span>Level 08 - ADVANCED</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%] rounded-full transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Performance Dashboard Section */}
        <div className="section-enter">
          <section className="max-w-7xl mx-auto px-8 py-24">
            <div className="bg-surface-container-low rounded-xl p-10 lg:p-16 border border-outline-variant/10">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="lg:w-1/3">
                  <div className="text-6xl font-headline font-black text-primary mb-4 tracking-tighter">84%</div>
                  <h3 className="text-2xl font-headline font-bold mb-6">Mastery Accuracy</h3>
                  <p className="text-on-surface-variant mb-8">You are currently in the top 5% of aspirants preparing for JEE 2024. Your growth in Electromagnetics has been exponential over the last 14 days.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-bold text-on-surface-variant">#OrganicChemistry</span>
                    <span className="px-4 py-2 bg-primary/10 rounded-full text-xs font-bold text-primary">#ModernPhysics</span>
                    <span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-bold text-on-surface-variant">#Calculus</span>
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="bg-surface-container-lowest p-6 rounded-xl neon-card flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <Zap className="text-tertiary-container" size={24} />
                      <span className="text-[0.65rem] font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded">WEEKLY TARGET</span>
                    </div>
                    <div>
                      <div className="text-3xl font-headline font-bold">1,240</div>
                      <div className="text-sm text-on-surface-variant">Questions Resolved</div>
                    </div>
                  </div>
                  
                  <div className="bg-surface-container-lowest p-6 rounded-xl neon-card flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <Target className="text-primary" size={24} />
                      <span className="text-[0.65rem] font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded">WEAK POINT</span>
                    </div>
                    <div>
                      <div className="text-3xl font-headline font-bold">Fluid Mechanics</div>
                      <div className="text-sm text-on-surface-variant">Review Recommended</div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-xl neon-card overflow-hidden relative">
                    <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
                      <img className="h-full w-full object-cover" alt="Data visualization graph with bright lines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6grTO5eKrWTLdnpxL9ax3nWnRj5fxLC2N4ZK01lkUMTKZQi9_6n88zmtrc54H6_nqavbRR9jWzRamfFuppaKAuVbd4CNwu-njQkwXvKLyQEvTNhKbwtXFp0DgrqxtmRRhEgIJTevORGs8iWZs4Ixs93siID9_6NW6udFdxFV9eyehgkggw48vrm9MDD0qh2yVX-bR0lzXQmCAJHf-51MztX74Ym2ZTZWQwWiIwmF9rTxDVgTjyFwPLMb8dLrUpip43GMP_shliEY"/>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-headline font-bold mb-6">Topic-wise Efficiency</h4>
                      <div className="space-y-4 max-w-md">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold uppercase"><span>Physics</span><span>92%</span></div>
                          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[92%] rounded-full"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold uppercase"><span>Chemistry</span><span>78%</span></div>
                          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-secondary w-[78%] rounded-full"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold uppercase"><span>Mathematics</span><span>84%</span></div>
                          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-primary-container w-[84%] rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Final CTA Section */}
        <div className="section-enter">
          <section className="max-w-7xl mx-auto px-8 py-32">
            <div className="bg-primary rounded-[3rem] p-12 lg:p-24 relative overflow-hidden text-center text-white">
              <div className="scan-line" style={{ opacity: 0.1 }}></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary-container -z-10"></div>
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
              <h2 className="text-4xl md:text-6xl font-syne font-extrabold mb-8 shimmer-text" style={{ backgroundImage: "linear-gradient(90deg, #ffffff 0%, #dad7ff 50%, #ffffff 100%)" }}>Start Your Preparation Today</h2>
              <p className="max-w-2xl mx-auto text-on-primary-container text-lg md:text-xl mb-12">Join 50,000+ students leveraging AURA AI to achieve their academic goals.</p>
              <button className="px-12 py-6 bg-white text-primary rounded-full font-headline text-xl font-black hover:scale-105 transition-all shadow-2xl hover:shadow-white/20">
                  Get Started Free
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Shell */}
      <footer className="w-full py-12 px-8 flex flex-col items-center gap-6 border-t border-indigo-500/10 bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-2 mb-4">
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-headline">J.A.R.V.I.S.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[0.65rem] font-mono text-primary font-bold">System Status: NOMINAL</span>
            </div>
            <div className="text-[0.65rem] font-mono text-on-surface-variant">Protocol 0-1 Active</div>
          </div>
        </div>
        <div className="flex gap-10 text-[0.75rem] font-label font-medium tracking-wide">
          <a className="text-slate-500 hover:underline decoration-indigo-500/50" href="#">Encryption</a>
          <a className="text-slate-500 hover:underline decoration-indigo-500/50" href="#">System Status</a>
          <a className="text-slate-500 hover:underline decoration-indigo-500/50" href="#">Developer API</a>
        </div>
        <div className="text-[0.75rem] text-slate-500 mt-6 font-mono text-center opacity-60">
            © 2024 J.A.R.V.I.S. Neural Network. All sub-processes synchronized.
        </div>
      </footer>
    </div>
  );
}
